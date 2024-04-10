/* --- Objeto JavaScript ---

const participante = {
  nome: "Mayk Brito",
  email: "mayk@gmail.com",
  dataIncricao: new Date(2024, 2, 22, 19, 20),
  dataCheckIn: new Date(2024, 2, 25, 22, 00)
   
}*/
// --- Array ---
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 23),
    dataCheckin: new Date(2024, 3, 6, 20, 20),
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 19, 23),
    dataCheckin: new Date(2024, 3, 5, 20, 20),
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 10, 30),
    dataCheckin: new Date(2024, 3, 4, 11, 0),
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 15, 45),
    dataCheckin: new Date(2024, 3, 2, 16, 30),
  },
  {
    nome: "Roberto Carlos",
    email: "roberto@gmail.com",
    dataInscricao: new Date(2024, 2, 4, 9, 15),
    dataCheckin: new Date(2024, 2, 26, 9, 45),
  },
  {
    nome: "Ana Júlia",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 13, 20),
    dataCheckin: new Date(2024, 2, 23, 14, 0),
  },
  {
    nome: "Felipe Martins",
    email: "felipe@gmail.com",
    dataInscricao: new Date(2024, 2, 6, 18, 30),
    dataCheckin: new Date(2024, 2, 22, 19, 10),
  },
  {
    nome: "Lucas Santos",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 7, 12, 5),
    dataCheckin: new Date(2024, 2, 21, 12, 50),
  },
  {
    nome: "Patrícia Gonçalves",
    email: "patricia@gmail.com",
    dataInscricao: new Date(2024, 2, 8, 14, 40),
    dataCheckin: new Date(2024, 2, 20, 15, 30),
  },
  {
    nome: "Eduardo Rocha",
    email: "eduardo@gmail.com",
    dataInscricao: new Date(2024, 2, 9, 17, 25),
    dataCheckin: new Date(2024, 2, 18, 18, 15),
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin);

  if (participante.dataCheckin == null) {
    dataCheckin = `
  <button 
  data-email="${participante.email}"
  onclick="fazerCheckIn(event)"
  >
  Confirmar Check-in
  </button>
  `;
  }

  return `
  <tr>
          <td>
            <strong>${participante.nome}</strong>
            <br />
            <small>${participante.email}</small>
          </td>
           <td>${dataInscricao}</td>
          <td>${dataCheckin}</td>
   </tr>
   `;
};

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }
  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosdoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosdoFormulario.get("nome"),
    email: dadosdoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckin: null,
  };

  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email;
  });

  if (participanteExiste) {
    alert("Email já Cadastrado");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Tem certeza que deseja fazer o Check-in?";

  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });
  participante.dataCheckin = new Date();

  atualizarLista(participantes);
};
