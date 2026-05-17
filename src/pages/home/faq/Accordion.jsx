const Accordion = ({data}) => {
    const {question,answer} = data
  return (
    <div className="w-full">
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          {question}
        </div>
        <div className="collapse-content text-sm">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
