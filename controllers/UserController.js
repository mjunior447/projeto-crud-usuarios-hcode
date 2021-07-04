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
            let btn = this.formEl.querySelector("[type=submit]")
            btn.disabled = true;

            let values = this.getValues();

            this.getPhoto().then((content) => {
                values.photo = content;
                this.addLine(values);
                this.formEl.reset();
                btn.disabled = false;
            }, (e) => {
                console.error(e);
            });

        })
    }


    // método que trata do recebimento da foto pelo javascript
    getPhoto() {

        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {
                if (item.name === "photo") {
                    return item;
                }
            });

            let file = elements[0].files[0];

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = e => {
                reject(e);
            }

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
        });

    }


    // preenche o JSON 'user' com os dados do formulário,
    // retornando uma instância da classe User com esses dados
    getValues() {
        let user = {};
            [...this.formEl.elements].forEach((field) => {
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

    // cria uma linha na tabela com os dados do formulário
    addLine(userData) {

        let tr = document.createElement("tr");

        tr.innerHTML = `
        <tr>
            <td><img src="${userData.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${(userData.admin) ? "Sim" : "Não"}</td>
            <td>${Utils.dateFormat(userData.register)}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
        `;

        this.tableEl.appendChild(tr);
        
    }

}