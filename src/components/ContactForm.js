
export const ContactForm = () => {


  return(
    <div>
      <h2>Adicionar/Editar Contato</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Nome"
        />
        <input
          type="text"
          name="email"
          placeholder="E-mail"
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}