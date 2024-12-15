const words = new Map([
    ["English", new Map([
          [1, "sun"],
          [2, "weather"],
          [3, "rain"],
          [4, "hail"],
          [5, "rainfall"],
          [6, "flood"],
          [7, "snowfall"],
          [8, "snow"],
          [9, "rainbow"],
          [10, "moon"]
    ])],
    ["Ukrainian", new Map([
          [1, "сонце"],
          [2, "погода"],
          [3, "дощ"],
          [4, "град"],
          [5, "ливень"],
          [6, "повінь"],
          [7, "снігопад"],
          [8, "сніг"],
          [9, "веселка"],
          [10, "місяць"]
    ])]
]);
      
const lang = Array.from(words.keys());
const wordsEN = words.get(lang[0]); 
const wordsUA = words.get(lang[1]);
let keysEN = Array.from(wordsEN.keys()); 
let wordUA;
let wordEN;
let wordNum = 1;
let isFlipped = false;
let history = [];
let correctAnswr = 0;
let wrongAnswr = 0;
      
function CheckButton() {
    $('#checkBtn').prop('disabled', isFlipped); 
}
function flipCard() {
    if (isFlipped) {$('.card').css('transform', 'rotateY(0deg)');
    } else {$('.card').css('transform', 'rotateY(180deg)');}
    isFlipped = !isFlipped;
    setTimeout(CheckButton(), 500);
}
      
function Choose() {
    $('.card-front').removeClass('correct incorrect');
    randomKey = keysEN[Math.floor(Math.random() * keysEN.length)];
    wordEN = wordsEN.get(randomKey); 
    wordUA = wordsUA.get(randomKey); 
    $('#wordEN').text(wordEN); 
    $('#wordUA').text(''); 
    history.push(randomKey);
    keysEN = keysEN.filter(key => key !== randomKey);  
}
      
function Check(wordText) {
    $('.card-front').removeClass('correct incorrect');
    if (wordText === wordUA) {
        $('.card-front').addClass('correct');
        correctAnswr++;
    } else {
        $('.card-front').addClass('incorrect');
        wrongAnswr++;
    }
    $('#trueSum').text(correctAnswr);
    $('#falseSum').text(wrongAnswr);
    $('#wordUA').text(wordUA); 
    setTimeout(flipCard, 500); 
}
          
$(function () {
    Choose();
    CheckButton(); 
    $('#checkBtn').click(function () {
    const wordText = $('#word').val().trim();
    if (wordText !== '') {
        Check(wordText);
        $('#word').val('');
    } else {alert("Введіть слово!");}
});
           
$('#rightArrow').click(function () {
    if (isFlipped && wordNum < 10) {
        wordNum++;
        $('#wordNum').text(`${wordNum}/10`);
        flipCard();
        Choose();
        CheckButton(); 
    } else if (isFlipped && wordNum == 10) {
        alert("Це останнє слово!");
        if (correctAnswr < 2){alert("У вас поганенький рівень англійської..") }
        else if(correctAnswr < 6 && correctAnswr > 2){alert("У вас середній рівень англійської.") }
        else if(correctAnswr  == 10 ){alert("МОЖНА ЇХАТИ В БРИТАНІЮ!") }
    };
   });
});