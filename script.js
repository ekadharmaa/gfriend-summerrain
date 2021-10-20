console.clear();
var _data = JSON.parse(`{
    "lyrics":[
    
    {"line":"Summer Rain (여름비)","time":750},

    {"line":"..","time":26000},
    
    {"line":"nuguegena hanbeonjjeum ssodajideon yeoreumbicheoreom","time":27000},

    {"line":"gabjakseure dagawosseotdeon sarangi itgetjyo","time":32300},

    {"line":"bitsorie jamdo mot jal mankeum","time":37000},

    {"line":"geuttaen niga naegen geuraetjyo","time":40000},

    {"line":"heulknaeeumeul meogeumeun naui gamjeongi","time":45000},

    {"line":"ssodanaedeusi tteollyeooneyo","time":49800},

    {"line":"jageumahan usaneul nanuryeog","time":54000},

    {"line":"dagaoneunga bwa (dugeundaeyo)","time":57000},

    {"line":"yeoreumnarui gijeogilkkayo?","time":62000},

    {"line":"..","time":63800},

    {"line":"challanhage bitnadeon siganieotdago","time":64000},

    {"line":"margeun yeoreumbicheoreom gomawosseotdago","time":69000},
    
    {"line":"hanjulgi bitmulcheoreom neomu areumdawotdeon","time":74000},

    {"line":"tumyeonghan urideului iyagi","time":79000},

    {"line":"..","time":83000},

    {"line":"miraeneun al su eopseotjyo seuchyeoganeun yeoubicheoreom","time":92000},

    {"line":"baramgwaneun dareuge jakkuman eotgallyeosseotjyo","time":96800},

    {"line":"biga gaen dwie mujigaecheoreom","time":101000},

    {"line":"jamsi meomureujin mayo","time":104000},

    {"line":"..","time":108000},

    {"line":"pulnaeeumeul meogeumeun naui gamjeongi","time":109000},

    {"line":"ssodanaedeusi jeojeooneyo","time":112800},

    {"line":"bamhaneurui dalmajeo","time":118000},

    {"line":"gariwojineun gyochajeomeseo (gidaryeoyo)","time":121000},

    {"line":"gijeogeun irueojilggayo?","time":125800},

    {"line":"..","time":128800},

    {"line":"challanhage bitnadeon siganieotdago","time":129000},

    {"line":"margeun yeoreumbicheoreom gomawosseotdago","time":133000},

    {"line":"hanjulgi bitmulcheoreom neomu areumdawotdeon","time":138000},

    {"line":"tumyeonghan urideului iyagi","time":143000},

    {"line":"..","time":148000},

    {"line":"~~ by: ekadharma ~~","time":148900},

    {"line":"..","time":154000},

    {"line":"haneureseo naerin nunmul gata (gieokhalge)","time":155000},

    {"line":"ajirangi pieonadeusi seolleeotdago","time":160000},

    {"line":"puripe maejin iseulbicheoreom","time":165000},

    {"line":"gippeugo ttaeron seulpeotdeon yeoreumnarui chueok","time":169000},

    {"line":"..","time":173500},

    {"line":"areumdapge bitnadeon gyejeori jinado","time":174000},

    {"line":"jigeumcheoreom yeongwonhi nareul jeoksyeojullae","time":179000},

    {"line":"hanjulgi bitmulcheoreom neomu areumdawotdeon","time":183000},

    {"line":"tumyeonghan urideului iyagi","time":189000},

    {"line":"..","time":192000},

    {"line":"Summer Rain (여름비)","time":193000}
    
    ]}`);
var currentLine = "";

function align() {
    var a = $(".highlighted").height();
    var c = $(".content").height();
    var d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
    var e = d + (a / 2) - (c / 2);
    $(".content").animate({ scrollTop: e + "px" }, { easing: "swing", duration: 250 });
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
    if ($(".lyrics").height() != lyricHeight) { //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
        lyricHeight = $(".lyrics").height();
        align();
    }
});

$(document).ready(function() {
    $("video").on('timeupdate', function(e) {
        var time = this.currentTime * 1000;
        var past = _data["lyrics"].filter(function(item) {
            return item.time < time;
        });
        if (_data["lyrics"][past.length] != currentLine) {
            currentLine = _data["lyrics"][past.length];
            $(".lyrics div").removeClass("highlighted");
            $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
            align();
        }
    });
});

generate();

function generate() {
    var html = "";
    for (var i = 0; i < _data["lyrics"].length; i++) {
        html += "<div";
        if (i == 0) {
            html += ` class="highlighted"`;
            currentLine = 0;
        }
        if (_data["lyrics"][i]["note"]) {
            html += ` note="${_data["lyrics"][i]["note"]}"`;
        }
        html += ">";
        html += _data["lyrics"][i]["line"] == "" ? "•" : _data["lyrics"][i]["line"];
        html += "</div>"
    }
    $(".lyrics").html(html);
    align();
}