### Regras da aplicação



#### [ ] Deve ser possível criar um usuário
1. Criar uma rota POST para cadastrar o usuário (`POST /users`)
- name (string)
- email (string – único)
- password (string – deve ser criptografada)

#### [ ] Deve ser possível identificar o usuário entre as requisições
2. Fazer sempre autenticação do usuário. Criar uma (`POST /sessions`)

```js
body: {
  "email": "",
  "password": "" 
}
```

Regras:
- Retornar um token JWT
- O token deve ser enviado nas próximas requisições autenticadas
- Todas as rotas de refeição devem exigir autenticação

#### [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações:
3. Criar uma rota POST para cadastrar as refeições. (`POST /meal`)
    
    *As refeições devem ser relacionadas a um usuário.*
    - Nome
    - Descrição
    - Data e Hora (datetime)
    - Está dentro ou não da dieta (isOnDiet (boolean))
  Regras:
  - A refeição deve estar vinculada ao usuário autenticado
  - O user_id deve ser obtido via token

#### [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
4. Criar uma rota PUT para editar as refeições. (`PUT /meals/:id`)

#### [ ] Deve ser possível apagar uma refeição
5. Criar uma rota DELETE para deletar as refeições. (`DELETE /meals/:id`)
  Regras:
  - O usuário só pode deletar refeições criadas por ele

#### [ ] Deve ser possível listar todas as refeições de um usuário
6. Criar uma rota GET para listar todas as refeiçoes (`GET /meals`)
  Regras:
  - Retornar apenas refeições do usuário autenticado

#### [ ] Deve ser possível visualizar uma única refeição
7. Criar uma rota GET para listar uma refeição especifica (`GET /meals/:id`)
  Regras:
  - O usuário só pode visualizar refeições criadas por ele

#### [ ] Deve ser possível recuperar as métricas de um usuário
8. Criar uma rota GET para recuperar as métricas de um usuário (`GET /meals/metrics`)
    ```js
    {
      "totalMeals": 0,
      "totalOnDiet": 0,
      "totalOffDiet": 0,
      "bestOnDietSequence": 0
    }
    ```

    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta

#### [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

Regra de Segurança (Muito Importante)
O usuário só pode visualizar, editar e deletar refeições que ele criou
Todas as rotas de meals devem exigir autenticação
O user_id nunca deve vir no body da requisição


### Primeiros passos

- Criar estrutura das pastas
- Dependências da aplicação -> npm install express prisma @prisma/client dotenv bcryptjs jsonwebtoken
- Dependências de desenvolvimento -> npm install -D typescript ts-node-dev @types/express @types/node @types/bcryptjs @types/jsonwebtoken
- Configurar TypeScript -> npx tsc --init
