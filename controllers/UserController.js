class UserController {

    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }

    // trata do evento de envio de dados do formulário
    onSubmit() {
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            this.addLine(this.getValues());
        })
    }


    // preenche o JSON 'user' com os dados do formulário,
    // instanciando a classe User com esses dados
    getValues() {
        let user = {};
            [...this.formEl.elements].forEach((field) => {
            // if (field.name == "gender") {
            //     if (field.checked) {
            //         user[field.name] = field.value;
            //     }
            // } else {
            //     user[field.name] = field.value;
            // }

            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else if (field.name == "admin") {
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }
        });

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
    }

    // cria linhas na tabela com os dados do formulário
    addLine(userData) {

        this.tableEl.innerHTML += `
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.admin}</td>
            <td>${userData.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
        `;
        
    }

}