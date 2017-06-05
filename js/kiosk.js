import $ from "jquery"
import getQueryParameters from "./getQueryParameters";

const GAMES = [
    { image: "be_the_king", gameId: "be-the-king" },
    { image: "the_heist", gameId: "the-heist" },
    { image: "spinlotto", gameId: "spinlotto" },
    { image: "the_link", gameId: "the-link" },
    { image: "epic_gems", gameId: "epic-gems" },
    { image: "roulette", gameId: "roulette-eu" },
    { image: "gears_of_fortune", gameId: "gears-of-fortune" },
    { image: "diamond_deal", gameId: "diamond-deal" },
    { image: "boss_the_lotto", gameId: "boss-the-lotto" },
    { image: "boss_the_ball", gameId: "boss-the-ball" },
    { image: "spinlotto_scratch", gameId: "scratch", variation: "&gameId=SPINLOTTO_SCRATCH" },
    { image: "the_link_scratch", gameId: "scratch", variation: "&gameId=THE_LINK_SCRATCH" },
    { image: "casino_scratch", gameId: "scratch", variation: "&gameId=BETSSON_CARDS&brand=betsson" },
    { image: "magic_scratch", gameId: "scratch", variation: "&gameId=BETSSON_MAGIC&brand=betsson" },
    { image: "treasure_scratch", gameId: "scratch", variation: "&gameId=BETSSON_TREASURE&brand=betsson" },
    { image: "diamond_scratch", gameId: "scratch", variation: "&gameId=BETSSON_DIAMOND&brand=betsson" },
    { image: "7_11_21", gameId: "7-11-21" },
    { image: "tennis", gameId: "scratch", variation: "&gameId=TENNIS" },
    { image: "football", gameId: "scratch", variation: "&gameId=FOOTBALL" },
    { image: "gold_cup", gameId: "scratch", variation: "&gameId=GOLD_CUP" },
];

global.kiosk = function kiosk() {
    $(function() {
        initGames();
    });
}

function initGames() {
    let query = getQueryParameters();

    let games = GAMES;

    if (query.exclude) {
        let exclude = query.exclude.split(",");
        games = games.filter(game => exclude.indexOf(game.gameId) === -1);
    }

    games.forEach(game => {
        let button = $(`<li></li>`);
        button.css("background-image", `url(./img/game_${game.image}.jpg)`);
        $(".games ul").append(button);
        button.click(() => {
            $("iframe").attr("src", `https://games.gamevy.com/prod/${game.gameId}/index.html?env=test&platform=gamevy&resolutionType=web_retina${game.variation || ""}`);
            goFullscreen();
        });
    });

    $(".games ul").css("width", games.length * 150);
}

function goFullscreen() {
    let element = document.body;
    if (element.requestFullscreen) { // W3C API
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Mozilla current API
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) { // Webkit current API
        element.webkitRequestFullScreen();
    } // Maybe other prefixed APIs?
}
