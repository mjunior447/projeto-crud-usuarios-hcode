var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};
var tbody = document.getElementById("table-users");

// criar linhas na tabela com os dados do formulário
function addLine(userData) {

    var tr = document.createElement("tr");

    tbody.innerHTML += `
    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.admin}</td>
        <td>${user.birth}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>
    `;
    
}

// tratando o envio de dados do formulário
document.getElementById("form-user-create").addEventListener("submit", (event) => {
    event.preventDefault();

    // preenchendo o JSON com os dados do formulário
    fields.forEach((field) => {
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

    var objectUser = new User(
        user.name,
        user.gender,
        user.birth,
        user.country,
        user.email,
        user.password,
        user.photo,
        user.admin
    );

    addLine(objectUser);
})