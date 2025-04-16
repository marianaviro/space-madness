import * as d3 from "d3";

const texts = [
  {
    "step": 0,
    "text":
      "Humanity first sent an artificial satellite, the sputnik I, on october 4, 1957. a few months later, Sputnik II was launched.",
  },
  {
    "step": 1,
    "text": "Hi.",
  },
];

export function Text({ step }) {
  return (
    <div className="text">
      <p>{texts[step].text}</p>
    </div>
  );
}
