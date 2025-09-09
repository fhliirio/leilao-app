import { GoogleSpreadsheet } from "google-spreadsheet";

export default async function handler(req, res) {
  try {
    const doc = new GoogleSpreadsheet("1Lgh_S8t1KgtoHlNuerMiS1fv8_y6wB-4bwst0NKXikQ");

    await doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_GOOGLE_CLIENT_EMAIL,
      private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    if (req.method === "GET") {
      const rows = await sheet.getRows();
      const data = rows.map((r) => ({
        modalidade: r["Modalidade do Leilão"],
        tipo: r["Tipo de Imóvel"],
        endereco: r["Endereço e Cidade"],
        ocupacao: r["Ocupação"],
        lance: r["Lance Inicial (R$)"],
        avaliacao: r["Valor de Avaliação (R$)"],
        mercado: r["Valor de Mercado Estimado (R$)"],
        custo: r["Custo Pós Arremate (R$)"],
      }));
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const body = JSON.parse(req.body);
      await sheet.addRow(body);
      return res.status(201).json({ message: "Imóvel adicionado com sucesso" });
    }

    res.status(405).json({ message: "Método não permitido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
