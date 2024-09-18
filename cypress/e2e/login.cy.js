 describe('Проверка авторизации', function () {
 it('Верный пароль и верный логин', function () {
    cy.visit('https://login.qa.studio');                          // Зайти на сайт
    cy.get('#mail').type('german@dolnikov.ru');                   // Найти и ввести верный логин
    cy.get('#pass').type('iLoveqastudio1');                       // Найти и ввести верный пароль
    cy.get('#loginButton').click();                               // Кликнуть войти
    cy.get('#messageHeader').should('be.visible');                // Проверить, что текст виден пользователю
    cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Содержит текст
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Наличие крестика
})
it('Восстановление пароля', function () {
    cy.visit('https://login.qa.studio');                        // Зайти на сайт
    cy.get('#forgotEmailButton').click();                       // Кликнуть форму восстановления пароля
    cy.get('#mailForgot').type('polyakova1395@gmail.com');      //ВВести почту
    cy.get('#restoreEmailButton').click();                      // Кликнуть восстановить
    cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //Сообщение об успешном восстановлении
    cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Наличие крестика
})
it('Верный логин и неверный пароль', function () {
    cy.visit('https://login.qa.studio');        
    cy.get('#mail').type('german@dolnikov.ru');  // Найти и ввести верный логин
    cy.get('#pass').type('iLoveqastudio4');      // Найти и ввести неверный пароль
    cy.get('#loginButton').click();              // Клик войти
    cy.get('#messageHeader').should('be.visible');  //Текст виден
    cy.get('#messageHeader').contains('Такого логина или пароля нет');  // Текст соответствует
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');      // Наличие крестика
})
it('Неверный логин и верный пароль', function () {
    cy.visit('https://login.qa.studio');        
    cy.get('#mail').type('dgerman@dolnikov.ru');  // Найти и ввести неверный логин
    cy.get('#pass').type('iLoveqastudio1');      // Найти и ввести верный пароль
    cy.get('#loginButton').click();              // Клик войти
    cy.get('#messageHeader').should('be.visible');  //Текст виден
    cy.get('#messageHeader').contains('Такого логина или пароля нет');  // Текст соответствует
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');    //Наличие крестика
})
it('Валидация на наличие @', function () {
    cy.visit('https://login.qa.studio')
    cy.get('#mail').type('germandolnikov.ru');     // Найти и ввести почту без @
    cy.get('#pass').type('iLoveqastudio');          // Найти и ввести верный пароль
    cy.get('#loginButton').click();                // Кликнуть войти
    cy.get('#messageHeader').should('be.visible');   // Текст виден пользователю
    cy.get('#messageHeader').contains('Нужно исправить проблему валидации');  // Получение сообщения об ошибке
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');  //Наличие крестика
})
it('Приведение к строчным буквам', function () {
    cy.visit('https://login.qa.studio')
    cy.get('#mail').type('GerMan@Dolnikov.ru');                   // НАйти и ввести логин разного регистра
    cy.get('#pass').type('iLoveqastudio1');                       // Найти и ввести верный пароль
    cy.get('#loginButton').click();                               // Кликнуть войти
    cy.get('#messageHeader').should('be.visible');                // Проверить, что текст виден пользователю
    cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Содержит текст
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Наличие крестика
})
})

describe('Покупка аватара', function () {                                // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[type="email"]').type('USER_LOGIN');                   // вводим логин
         cy.get('input[type="password"]').type('USER_PASSWORD');               // вводим пароль
         cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
         cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
         cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
         cy.get('.credit').type('4620869113632996');                     // вводим номер карты
         cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
         cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
         cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
         cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
     });
 });