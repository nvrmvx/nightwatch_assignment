var today = new Date().toJSON().slice(0,10).replace(/-/g,'.');
module.exports = {
    '@tags': ['task'],
    'Проверка формы поиска по городам': function (browser) {
      browser
        .url('https://www.ventusky.com/')
        .waitForElementVisible('body')
        .verify.visible('#search-q')
        .setValue('#search-q', 'Almaty')
        .pause(3000)
        //При в вводе в поле поиска слова "Almaty", в выпадающем списке появиться минимум 1 пункт
        .verify.not.cssClassPresent('#header > ul > li', 'progress')
        //Хотя бы у однго пункта широта и долгота будут содержать числа 43° и 76°
        .verify.containsText('#header > ul > li > a > span', '43°')
        .verify.containsText('#header > ul > li > a > span', '76°')
        .saveScreenshot('reports/' + today + '/testCase1.jpg');
    },
    'Проверка карты': function (browser) {
      browser
        .url('https://www.ventusky.com/?p=42.9;83.3')
        //По клику на город Алматы на карте появляется дополнительное меню.
        .click('a[href="almaty"]')
        .waitForElementVisible('#aside')
        //Название нажатого элемента на карте такое же как и название на дополнительном меню.
        .verify.containsText('#aside h1', 'Алматы (Almaty)')
        .saveScreenshot('reports/' + today + '/testCase2.jpg');
    }
  };