var React=require('react')
var ReactDOM=require('react-dom')
var App=require('./components/App')
class CreateCard extends React.Component {
  constructor() {
    super();
    this.state = {
      word: "",
      description: "",
      showError: false };

  }

  hideError() {
    this.setState({ showError: !this.state.showError });
  }

  render() {
    const errorMessage = this.state.showError ?
    "Please fill in the word and description!" :
    "";"";
  }}



class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      showAnswer: false };

  }

  render() {
    const content = this.state.showAnswer ?
    this.props.backContent :
    this.props.frontContent;
    const iconClass = this.state.showAnswer ? "reply" : "share";
    const cardClass = this.state.showAnswer ? "back" : "";
    const contentClass = this.state.showAnswer ? "back" : "front";
    const actionClass = this.state.showAnswer ? "active" : "";

    return /*#__PURE__*/(
      React.createElement("div", {
        className: `card ${cardClass}`,
        onClick: () => this.setState({ showAnswer: !this.state.showAnswer }) }, /*#__PURE__*/

      React.createElement("span", { className: "card__counter" }, this.props.cardNumber + 1), /*#__PURE__*/
      React.createElement("div", {
        className: "card__flip-card",
        onClick: () => {
          this.setState({ showAnswer: !this.state.showAnswer });
        } }, /*#__PURE__*/

      React.createElement("span", { className: `fa fa-${iconClass}` })), /*#__PURE__*/

      React.createElement("div", { className: `card__content--${contentClass}` }, content), /*#__PURE__*/
      React.createElement("div", { className: `card__actions ${actionClass}` }, /*#__PURE__*/
      React.createElement("div", {
        className: "card__prev-button",
        onClick: () => {
          this.props.showPrevCard();
          this.setState({ showAnswer: false });
        } }, "Prev"), /*#__PURE__*/



      React.createElement("div", {
        className: "card__next-button",
        onClick: () => {
          this.props.showNextCard();
          this.setState({ showAnswer: false });
        } }, "Next"))));






  }}




class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    const user = props.data;
    const juser = JSON.parse(user);
    this.state = {
      cards: Immutable.fromJS(
      //Users
      juser),

      cardNumber: 0 };

    this.boundCallback = this.hideCreateCard.bind(this);
    this.boundCreateCard = this.setCard.bind(this);
    this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
  }

  hideCreateCard() {
    this.setState({ showModal: false });
  }

  showNextCard() {
    if (this.state.cardNumber + 1 !== this.state.cards.size) {
      this.setState({ cardNumber: this.state.cardNumber += 1 });
    }
  }

  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({ cardNumber: this.state.cardNumber -= 1 });
    }
  }

  setCard(card) {
    const newCards = this.state.cards.push(card);
    this.setState({ cards: newCards });
  }

  generateDots() {
    const times = this.state.cards.size;
    let arr = [];
    _.times(times).forEach(num => {
      const dotClass = num === this.state.cardNumber ? "active" : "";
      arr.push( /*#__PURE__*/
      React.createElement("span", {
        className: `card-container__dot fa fa-circle ${dotClass}`,
        onClick: () => this.setState({ cardNumber: num }) }));


    });
    return arr;
  }

  generateCards() {
    const cards = this.state.cards;
    //const cards = {this.props.data};
    const cardsList = cards.map(card => {
      return /*#__PURE__*/(
        React.createElement(Card, {
          frontContent: card.get("word"),
          backContent: card.get("description"),
          showNextCard: this.boundShowNextCard,
          showPrevCard: this.boundShowPrevCard,
          cardNumber: this.state.cardNumber }));


    });
    return cardsList.toJS()[this.state.cardNumber];
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null,


      this.state.showModal ?
      "" //delete CreateCard content
      :
      "",

      this.generateCards(), /*#__PURE__*/
      React.createElement("div", { className: "card-container__dots-wrapper" },
      this.generateDots())));



  }}

const Users = [
{
  word: "Deepak",
  description: "123" },

{
  word: "Yash",
  description: "124" },

{
  word: "Raj",
  description: "125" },
{
  word: "Rohan",
  description: "126" },

{
  word: "Puneet",
  description: "127" },


{
  word: "Vivek",
  description: "128" }];


class Main extends React.Component {

  //export default Users;
  render() {
    const user_string = JSON.stringify(Users);
    const data_string=this.props.args["data"]
    return /*#__PURE__*/(

      React.createElement("div", { className: "wrapper" }, /*#__PURE__*/
      React.createElement("div", { className: "content-wrapper" }, /*#__PURE__*/
      React.createElement(CardContainer, { data: user_string }))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.getElementById("app"));
