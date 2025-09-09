import React, { useState, useEffect } from "react";
import { loadImoveis, addImovel } from "./googleSheets";

function App() {
  const [imoveis, setImoveis] = useState([]);
  const [form, setForm] = useState({
    modalidade: "",
    tipo: "",
    endereco: "",
    ocupacao: "",
    lance: "",
    avaliacao: "",
    mercado: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await loadImoveis();
      setImoveis(data);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addImovel(form);
    const data = await loadImoveis();
    setImoveis(data);
    setForm({
      modalidade: "",
      tipo: "",
      endereco: "",
      ocupacao: "",
      lance: "",
      avaliacao: "",
      mercado: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Viabilidade de Imóveis em Leilão</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="modalidade" placeholder="Modalidade" value={form.modalidade} onChange={handleChange} />
        <input name="tipo" placeholder="Tipo de Imóvel" value={form.tipo} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço e Cidade" value={form.endereco} onChange={handleChange} />
        <input name="ocupacao" placeholder="Ocupação" value={form.ocupacao} onChange={handleChange} />
        <input name="lance" placeholder="Lance Inicial (R$)" value={form.lance} onChange={handleChange} />
        <input name="avaliacao" placeholder="Valor de Avaliação (R$)" value={form.avaliacao} onChange={handleChange} />
        <input name="mercado" placeholder="Valor de Mercado Estimado (R$)" value={form.mercado} onChange={handleChange} />
        <button type="submit">Adicionar</button>
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Modalidade</th>
            <th>Tipo</th>
            <th>Endereço</th>
            <th>Ocupação</th>
            <th>Lance</th>
            <th>Avaliação</th>
            <th>Mercado</th>
            <th>Custo Pós Arremate</th>
          </tr>
        </thead>
        <tbody>
          {imoveis.map((imovel, i) => (
            <tr key={i}>
              <td>{imovel.modalidade}</td>
              <td>{imovel.tipo}</td>
              <td>{imovel.endereco}</td>
              <td>{imovel.ocupacao}</td>
              <td>{imovel.lance}</td>
              <td>{imovel.avaliacao}</td>
              <td>{imovel.mercado}</td>
              <td>{imovel.custo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
