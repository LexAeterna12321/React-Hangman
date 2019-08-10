import React, { Component } from "react";
import { randomWord } from "./words";
import AlphaButton from "./AphaButton";
import Image from "./Image";
import "./Hangman.css";
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      isWin: false
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.guessedWord = this.guessedWord.bind(this);
    this.renderWrongs = this.renderWrongs.bind(this);
    this.highlightWrongs = this.highlightWrongs.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
  }

  guessedWord = () => {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  };

  checkForWin() {
    const hiddenWord = this.guessedWord();
    const isWin = !hiddenWord.some(ltr => ltr === "_");

    isWin && this.setState({ isWin: isWin });
  }

  async handleGuess(evt) {
    let ltr = await evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
    this.checkForWin();
  }

  restartGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      isWin: false
    });
  }

  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map(ltr => (
        <AlphaButton
          key={ltr}
          val={ltr}
          cb={this.handleGuess}
          isActive={this.state.guessed.has(ltr)}
          clName="btn"
        />
      ));
  };

  renderWrongs() {
    const elem = React.createElement(
      "span",
      {
        style: { color: "#000" }
      },
      this.state.nWrong
    );
    this.highlightWrongs(this.state.nWrong, elem);

    return elem;
  }

  highlightWrongs(wrongsNum, elem) {
    if (
      wrongsNum >= this.props.maxWrong / 2 &&
      wrongsNum <= (this.props.maxWrong * 0.7).toFixed(0)
    ) {
      elem.props.style.color = "#aaaa00";
    } else if (wrongsNum >= (this.props.maxWrong * 0.9).toFixed(0)) {
      elem.props.style.color = "#cc0000";
    }
  }

  renderLoseMsg() {
    return <h2 style={{ color: "#cc0000" }}>You Lose! Try Again!</h2>;
  }

  renderWinMsg() {
    return <h2 style={{ color: "#00cc00" }}>You Won!</h2>;
  }

  renderWinBoard() {
    return (
      <div>
        {this.renderWinMsg()}
        <AlphaButton
          val="Try again"
          cb={this.restartGame}
          clName="btn restart-btn"
        />
      </div>
    );
  }

  renderLoseBoard() {
    return (
      <div>
        {this.renderLoseMsg()}
        <h2>Correct word: {this.state.answer}</h2>
        <AlphaButton
          val="Try again"
          cb={this.restartGame}
          clName="btn restart-btn"
        />
      </div>
    );
  }

  render() {
    const {
      renderWrongs,
      generateButtons,
      guessedWord,
      state: { nWrong, isWin },
      props: { maxWrong, images }
    } = this;

    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <Image images={images} nWrong={nWrong} />
        <p className="Hangman-wrongs">Wrong choices: {renderWrongs()}</p>
        {nWrong < maxWrong ? (
          <div>
            <p className="Hangman-word">{guessedWord()}</p>
            {isWin ? (
              this.renderWinBoard()
            ) : (
              <p className="Hangman-btns">{generateButtons()} </p>
            )}
          </div>
        ) : (
          this.renderLoseBoard()
        )}
      </div>
    );
  }
}

export default Hangman;
