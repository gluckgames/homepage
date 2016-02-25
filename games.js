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
        "url": "https://942ee359b38c739ec703-e7b4a4a9cfc3068a977f0739a8065678.ssl.cf3.rackcdn.com",
        "version": 1,
        "languages": {
            "en-GB": "Boss the Lotto",
            "de-DE": "Lottoboss"
        }
    },
    {
        "path": "boss-the-ball",
        "url": "https://12139ec25694b8ee0c5a-9bef4630b3d43ea6b4b821b024198164.ssl.cf3.rackcdn.com",
        "version": 1,
        "languages": {
            "en-GB": "Boss the Ball"
        }
    },
    {
        "path": "diamond-deal",
        "url": "https://74926736e21dc1cdb6de-44165718bd41782521e59ee38cd99a6d.ssl.cf3.rackcdn.com",
        "version": 1,
        "languages": {
            "en-GB": "Diamond Deal",
            "pl-PL": "Diamentowe Łowy"
        }
    }
];

var LANGUAGES = {
    "en-GB": {
        "prefix": "",
        "currency": "GBP",
        "fullscreen": "Play in full screen",
        "name": "English"
    },
    "de-DE": {
        "prefix": "-de-DE",
        "currency": "EUR",
        "fullscreen": "Spiele in Vollbild",
        "name": "German"
    },
    "pl-PL": {
        "prefix": "-pl-PL",
        "currency": "PLN",
        "fullscreen": "na pełnym ekranie",
        "name": "Polish"
    },
    "sv-SE": {
        "prefix": "-sv-SE",
        "currency": "SEK",
        "fullscreen": "Spela i helskärmsläge",
        "name": "Swedish"
    },
    "cs-CZ": {
        "prefix": "-cs-CZ",
        "currency": "CZK",
        "fullscreen": "Hrej na celé obrazovce",
        "name": "Czech"
    },
    "pt-BR": {
        "prefix": "-pt-BR",
        "currency": "BRL",
        "fullscreen": "Jogar em tela cheia",
        "name": "Portugese"
    },
    "ru-RU": {
        "prefix": "-ru-RU",
        "currency": "RUB",
        "fullscreen": "играть во весь экран",
        "name": "Russian"
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
                .replace(new RegExp("{{languageSwitch}}", "g"), getLanguageSwitch(game.languages, languageCode, game.path))

                // Remove navbar-fixed, it creates problems on small screens
                .replace("navbar-fixed-top js-navbar-top", "");

            var filename = path.resolve(__dirname, "dist", game.path + language.prefix + ".html");

            fs.writeFileSync(filename, data, "utf8");
        });
    });
}

function getLanguageSwitch(supported, currentLanguageCode, path) {
    if (supported.length === 1) {
        return;
    }

    return _.map(supported, function(name, languageCode) {
        var name = LANGUAGES[languageCode].name;
        var url = "/" + path + LANGUAGES[languageCode].prefix + ".html";

        if (languageCode === currentLanguageCode) {
            return "<li class=\"disabled\"><a href=\"" + url + "\">" + name + "</a></li>";
        } else {
            return "<li><a href=\"" + url + "\">" + name + "</a></li>";
        }
    }).join("");
}
