//https://pt.linkedin.com/pulse/hexagonal-clean-architecture-wellington-guimar%C3%A3es-pimenta-le8rf

// 3 camadas:

// presentation
//     v
// logic
//     v
// data

// 4 camadas:

// presentation
//     v
// interface (port) read write
//     v
// application: logic (input e output)
//     v
// interface (port) read write
//     v
// adapter
//     v
// interface (port) read write
//     v
// data

// principio da inversao de dependencia (port-adapter)
// principio da responsabilidade única (controler-UseCase)
// tudo começa:
//uma classe controladora (responsável por lidar com as solicitações do usuário)
//invoca a classe UseCase de caso de uso para executar a ação do usuário.
// cria-se a interface e implementa a interface.
// o usecase usa o metodo da interface atraves da injeção de dependência no seu contrutor

// entrada
//usuário(front) -> featureController -> IClassUseClasePort -> classUseCase (<-> domain)

//1- crie uma interface IClassA com o metodo x
// a interface são usadas para interagir com o mundo exterior (IClassPort)
//2- crie a implementação desta interface com o metodo x ( classAdapterA implement IClassPort)
//2- crie a implementação desta interface com o metodo x ( classAdapterB implement IClassPort)
//3- crie uma classe UseCase que usará a implementação com o metodo x ( classUseCase)
//UseCase:os casos de uso são as ações ou intenções do usuário
//3.1 no contrutor da classe adicione a interface (constructor(private instance: IClassPort))
//3.2 use o método x da classAdapterA ou da classAdapterB

//saída
//classUseCase (<-> domain) -> IClassPort -> classAdapterA  ->
//ExportUserUseCase (<-> domain) -> ExportUser -> ExportUserToCSV  ->

//Em vez de ter nossa classe de caso de uso (ou classe de serviço)
//fortemente acoplada à API REST externa, podemos simplesmente criar uma Porta,
//que define a interface que nossa classe de caso de uso precisa implementar
//para buscar os dados (independentemente de como os dados são buscado,
//usando uma API REST, um banco de dados, uma API GraphQL, etc.).
//E então podemos criar a Adapter, que é uma classe que implementa a
//interface Port e delega as chamadas para a API REST externa (ou outro serviço externo).

//Dessa forma, se precisarmos alterar a forma como buscamos os dados, bastamos
//criar um novo Adapter que implemente a interface Port, sem precisar alterar a
//implementação do caso de uso.

// quero exportar um usuário

// domain
type User = {
  name: string;
  email: string;
  dateOfBirth: Date;
};

//****************** */
// criar uma interface para abstrair a lógica de exportação (Porta):
// Port interface
interface ExportUser {
  export(user: User): any;
}

//E então crie uma (ou mais) implementações desta interface (Adaptador):
// CSV Adapter implementation
class ExportUserToCSV implements ExportUser {
  export(user: User) {
    // Export user to a CSV file
  }
}

// PDF Adapter implementation
class ExportUserToPDF implements ExportUser {
  export(user: User) {
    // Export user to a PDF file
  }
}

//Fazendo isso, a implementação da exportação do usuário dependerá da
//interface (abstração), conforme afirma o Princípio da Inversão de Dependência.

//classe de caso de uso (ou classe de serviço na terminologia Domain-Driven Design)
// é uma classe responsável por uma ação (intenção) específica do usuário.
//Como buscar um pedido, criar um produto, atualizar um usuário, excluir um artigo, etc.
// aplication

class ExportUserUseCase {
  constructor(private exportUser: ExportUser) {}

  execute(user: User) {
    this.exportUser.export(user);
  }
}
//E a classe de caso de uso não dependerá de nenhuma implementação concreta

//Finalmente, podemos alternar entre diferentes implementações da exportação do
//usuário, sem precisar alterar a implementação da classe de caso de uso:

// Export user to a CSV file
const exportUserToCSV = new ExportUserToCSV();
const exportUserUseCase = new ExportUserUseCase(exportUserToCSV);

exportUserUseCase.execute({
  name: "John Doe",
  email: "john.doe@mail.com",
  dateOfBirth: new Date(),
});

// Export user to a PDF file
const exportUserToPDF = new ExportUserToPDF();
const newExportUserUseCase = new ExportUserUseCase(exportUserToPDF);

newExportUserUseCase.execute({
  name: "John Doe",
  email: "john.doe@mail.com",
  dateOfBirth: new Date(),
});
