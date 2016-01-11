var GAMES = [
    {
        "path": "the-heist",
        "url": "https://70234542b69db413cdd4-ec3382d217bd165415e45cc0dc163fa1.ssl.cf3.rackcdn.com",
        "version": 2,
        "languages": {
            "en-GB": "The Heist",
            "de-DE": "Der Tresor",
            "pl-PL": "Włambank",
            "sv-SE": "Kuppen",
            "ru-RU": "Грабитель"
        }
    },
    {
        "path": "gears-of-fortune",
        "url": "https://cb0ae37100c1554702d9-f0d4393fe19cd1569847c666aa639f95.ssl.cf3.rackcdn.com",
        "version": 1,
        "languages": {
            "en-GB": "Gears of Fortune",
            "de-DE": "Glückszahnrad",
            "pl-PL": "Maszyna Fortuny",
            "ru-RU": "Знаки Фортуны"
        }
    },
    {
        "path": "buzzword",
        "url": "https://38050b8429872a8d3654-52cd88461befb180e6ba6df9d51f2d49.ssl.cf3.rackcdn.com",
        "version": 1,
        "languages": {
            "en-GB": "Buzzword Bingo",
            "de-DE": "Wortbingo",
            "pl-PL": "Gra słów"
        }
    },
    {
        "path": "boss-the-lotto",
        "url": "https://e8712e7c7a6a1f5996ff-b56156305062b1fa52cb797a5a0bf8a9.ssl.cf3.rackcdn.com", // Master
        "version": 1,
        "languages": {
            "en-GB": "Boss the Lotto"
        }
    }
];

var LANGUAGES = {
    "en-GB": {
        "prefix": "",
        "currency": "GBP",
        "fullscreen": "Play in full screen"
    },
    "de-DE": {
        "prefix": "-de-DE",
        "currency": "EUR",
        "fullscreen": "Spiele in Vollbild"
    },
    "pl-PL": {
        "prefix": "-pl-PL",
        "currency": "PLN",
        "fullscreen": "na pełnym ekranie"
    },
    "sv-SE": {
        "prefix": "-sv-SE",
        "currency": "SEK",
        "fullscreen": "Spela i helskärmsläge"
    },
    "cs-CZ": {
        "prefix": "-cs-CZ",
        "currency": "CZK",
        "fullscreen": "Hrej na celé obrazovce"
    },
    "pt-BR": {
        "prefix": "-pt-BR",
        "currency": "BRL",
        "fullscreen": "Jogar em tela cheia"
    },
    "ru-RU": {
        "prefix": "-ru-RU",
        "currency": "RUB",
        "fullscreen": "играть во весь экран"
    }
};


var _ = require("underscore");
var fs = require("fs");
var path = require("path");

module.exports = function() {
    fs.existsSync("dist") || fs.mkdirSync("dist");

    var template =
        fs.readFileSync(path.resolve(__dirname, "partials", "header.html"), "utf8") +
        fs.readFileSync(path.resolve(__dirname, "partials", "game.html"), "utf8") +
        fs.readFileSync(path.resolve(__dirname, "partials", "footer.html"), "utf8");

    _.forEach(GAMES, function(game) {
        _.forEach(game.languages, function(name, languageCode) {
            var language = LANGUAGES[languageCode];

            var data = template
                .replace(new RegExp("{{currency}}", "g"), language.currency)
                .replace(new RegExp("{{language}}", "g"), languageCode)
                .replace(new RegExp("{{url}}", "g"), game.url)
                .replace(new RegExp("{{name}}", "g"), name)
                .replace(new RegExp("{{fullscreen}}", "g"), language.fullscreen)
                .replace(new RegExp("{{version}}", "g"), game.version)

                // Remove navbar-fixed, it creates problems on small screens
                .replace("navbar-fixed-top js-navbar-top", "");

            var filename = path.resolve(__dirname, "dist", game.path + language.prefix + ".html");

            fs.writeFileSync(filename, data, "utf8");
        });
    });
}
