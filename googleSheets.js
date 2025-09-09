import { GoogleSpreadsheet } from "google-spreadsheet";

const SHEET_ID = "1Lgh_S8t1KgtoHlNuerMiS1fv8_y6wB-4bwst0NKXikQ";

const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

async function connect() {
  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  });
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

export async function loadImoveis() {
  const sheet = await connect();
  const rows = await sheet.getRows();
  return rows.map((r) => ({
    modalidade: r["Modalidade do Leilão"],
    tipo: r["Tipo de Imóvel"],
    endereco: r["Endereço e Cidade"],
    ocupacao: r["Ocupação"],
    lance: parseFloat(r["Lance Inicial (R$)"] || 0),
    avaliacao: parseFloat(r["Valor de Avaliação (R$)"] || 0),
    mercado: parseFloat(r["Valor de Mercado Estimado (R$)"] || 0),
    custo: parseFloat(r["Custo Pós Arremate (R$)"] || 0),
  }));
}

export async function addImovel(data) {
  const { modalidade, tipo, endereco, ocupacao, lance, avaliacao, mercado } = data;

  const desconto = avaliacao > 0 ? ((avaliacao - lance) / avaliacao) * 100 : 0;
  const itbi = lance * 0.03;
  const registro = 1500;
  const escritura = 2000;
  const custoPosArremate = lance + itbi + registro + escritura;
  const margemBruta = mercado - custoPosArremate;
  const margemPercent = mercado > 0 ? (margemBruta / mercado) * 100 : 0;

  const sheet = await connect();
  await sheet.addRow({
    "Modalidade do Leilão": modalidade,
    "Tipo de Imóvel": tipo,
    "Endereço e Cidade": endereco,
    "Ocupação": ocupacao,
    "Lance Inicial (R$)": lance,
    "Valor de Avaliação (R$)": avaliacao,
    "% de Desconto": desconto.toFixed(2) + "%",
    "Valor de Mercado Estimado (R$)": mercado,
    "ITBI (R$)": itbi.toFixed(2),
    "Registro (R$)": registro,
    "Escritura (R$)": escritura,
    "Custo Pós Arremate (R$)": custoPosArremate.toFixed(2),
    "Margem Bruta (R$)": margemBruta.toFixed(2),
    "Margem %": margemPercent.toFixed(2) + "%",
  });
}
