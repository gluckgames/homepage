var GAMES = [
    {
        "path": "the-heist",
        "url": "https://games.gamevy.com/prod/the-heist",
        "version": 2,
        "ratio": 4/3,
        "languages": {
            "en-GB": "The Heist",
            "de-DE": "Der Tresor",
            "pl-PL": "Włambank",
            "sv-SE": "Kuppen",
            "ru-RU": "ГрабеЖ"
        }
    },
    {
        "path": "gears-of-fortune",
        "url": "https://games.gamevy.com/prod/gears-of-fortune",
        "version": 1,
        "ratio": 4/3,
        "languages": {
            "en-GB": "Gears of Fortune",
            "de-DE": "Glückszahnrad",
            "pl-PL": "Maszyna Fortuny",
            "ru-RU": "Знаки Фортуны"
        }
    },
    {
        "path": "buzzword",
        "url": "https://games.gamevy.com/prod/buzzword",
        "version": 1,
        "ratio": 4/3,
        "languages": {
            "en-GB": "Buzzword Bingo",
            "de-DE": "Wortbingo",
            "pl-PL": "Gra słów"
        }
    },
    {
        "path": "boss-the-lotto",
        "url": "https://games.gamevy.com/prod/boss-the-lotto",
        "version": 1,
        "ratio": 4/3,
        "languages": {
            "en-GB": "Boss the Lotto",
            "de-DE": "Lottoboss",
            "sv-SE": "Lotto Boss",
            "pl-PL": "Lotto Lider",
            "ru-RU": "Босс лото",
            "no-NO": "Lotto Boss",
            "zh-CN": "Lotto Boss"
        }
    },
    {
        "path": "boss-the-ball",
        "url": "https://games.gamevy.com/prod/boss-the-ball",
        "version": 1,
        "ratio": 4/3,
        "languages": {
            "en-GB": "Red Card",
            "de-DE": "Rote Karte",
            "sv-SE": "Rött Kort",
            "pl-PL": "Czerwone Kartki",
            "ru-RU": "Мастер мяча",
            "no-NO": "Boss the Ball"
        }
    },
    {
        "path": "diamond-deal",
        "url": "https://games.gamevy.com/prod/diamond-deal",
        "version": 1,
        "ratio": 4/3,
        "languages": {
            "en-GB": "Diamond Deal",
            "de-DE": "Diamanten Deal",
            "sv-SE": "Diamant Jakten",
            "pl-PL": "Diamentowe Łowy",
            "ru-RU": "Найди алмаз",
            "no-NO": "Diamond Deal"
        }
    },
    {
        "path": "epic-gems",
        "url": "https://games.gamevy.com/prod/epic-gems",
        "version": 1,
        "ratio": 16/9,
        "languages": {
            "en-GB": "Epic Gems",
            "de-DE": "Epic Gems",
            "pl-PL": "Bombowe Klejnoty",
            "no-NO": "Epic Gems",
            "sv-SE": "Ädelstenar",
            "ru-RU": "Найди алмаз"
        }
    },
    {
        "path": "spinlotto",
        "url": "https://games.gamevy.com/prod/spinlotto",
        "version": 1,
        "ratio": 16/9,
        "languages": {
            "en-GB": "Spinlotto",
            "de-DE": "Spinlotto",
            "sv-SE": "Spinlotto",
            "pl-PL": "Spinlotto",
            "ru-RU": "Spinlotto"
        }
    },
    {
        "path": "spinlotto-scratch",
        "url": "https://games.gamevy.com/prod/scratch",
        "version": 1,
        "ratio": 16/9,
        "variation": "&gameId=SPINLOTTO_SCRATCH",
        "languages": {
            "en-GB": "Spinlotto Scratch",
            "de-DE": "Spinlotto Rubbellos"
        }
    },
    {
        "path": "the-link-scratch",
        "url": "https://games.gamevy.com/prod/scratch",
        "version": 1,
        "ratio": 16/9,
        "variation": "&gameId=THE_LINK_SCRATCH",
        "languages": {
            "en-GB": "The Link Scratch",
            "de-DE": "The Link Rubbellos"
        }
    },
    {
        "path": "the-link",
        "url": "https://games.gamevy.com/prod/the-link",
        "version": 1,
        "ratio": 16/9,
        "languages": {
            "en-GB": "The Link",
            "de-DE": "The Link"
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
        "fullscreen": "Pełny ekran",
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
    },
    "no-NO": {
        "prefix": "-no-NO",
        "currency": "NOK",
        "fullscreen": "Play in full screen",
        "name": "Norwegian"
    },
    "zh-CN": {
        "prefix": "-zh-CN",
        "currency": "CNY",
        "fullscreen": "Play in full screen",
        "name": "Chinese"
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
                .replace(new RegExp("{{ratio}}", "g"), game.ratio)
                .replace(new RegExp("{{languageSwitch}}", "g"), getLanguageSwitch(game.languages, languageCode, game.path))
                .replace(new RegExp("{{variation}}", "g"), game.variation || "")

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
