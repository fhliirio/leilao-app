import React, { useState, useEffect } from "react";

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
    fetch("/api/sheets")
      .then((res) => res.json())
      .then((data) => setImoveis(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/sheets", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await fetch("/api/sheets").then((res) => res.json());
    setImoveis(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Viabilidade de Imóveis em Leilão</h1>

      <form onSubmit={handleSubmit}>
        <input name="modalidade" placeholder="Modalidade" onChange={handleChange} />
        <input name="tipo" placeholder="Tipo de Imóvel" onChange={handleChange} />
        <input name="endereco" placeholder="Endereço e Cidade" onChange={handleChange} />
        <input name="ocupacao" placeholder="Ocupação" onChange={handleChange} />
        <input name="lance" placeholder="Lance Inicial (R$)" onChange={handleChange} />
        <input name="avaliacao" placeholder="Valor de Avaliação (R$)" onChange={handleChange} />
        <input name="mercado" placeholder="Valor de Mercado Estimado (R$)" onChange={handleChange} />
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
