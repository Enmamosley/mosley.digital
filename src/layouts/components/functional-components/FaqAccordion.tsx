import React, { useState } from "react";
import { BiSolidUpArrowAlt } from "react-icons/bi";

interface FAQ {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FAQ[];
}

const FaqAccordion = ({ faqs }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </>
  );
};

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) => {
  return (
    <div className="bg-light py-5 px-6 rounded-2xl">
      <div
        className="flex justify-between gap-x-4 cursor-pointer items-center"
        onClick={onToggle}
      >
        <h3 className="text-h5 mb-0!">{question}</h3>

        <div
          className={`size-12 rounded-full bg-white shadow-[inset_4px_4px_9px_0px_rgba(61,61,61,0.1),inset_-4px_-4px_4px_0px_rgba(228,228,228,0.25),0px_8px_24px_0px_rgba(29,29,29,0.04)] transform-none origin-center shrink-0 flex items-center justify-center transition-transform duration-500 ${isOpen ? "text-primary" : "rotate-180 "}`}
        >
          <BiSolidUpArrowAlt className="size-7 " />
        </div>
      </div>

      <div
        style={{
          maxHeight: isOpen ? "1000px" : "0px",
          marginTop: isOpen ? "16px" : "0px",
        }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="text-xl text-text-dark">{answer}</div>
      </div>
    </div>
  );
};

export default FaqAccordion;
