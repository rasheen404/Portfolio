import React, { useState } from "react";
import { portfolioData } from "../data.jsx";
import { Section } from "./Section";
import { SendIcon } from "./Icons";

const CodeSyntax = ({ children, type }) => {
  const colors = {
    keyword: "text-pink-400",
    string: "text-green-300",
    method: "text-yellow-300",
    class: "text-blue-400",
    variable: "text-purple-300",
    comment: "text-gray-500 italic",
    default: "text-[var(--text-primary)]",
  };
  return <span className={colors[type] || colors.default}>{children}</span>;
};

export const Contact = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const questions = [
    { key: "name", text: "👤 Enter your Name:" },
    { key: "email", text: "📧 Enter your Email:" },
    { key: "message", text: "💬 Enter your Message:" },
  ];

  return (
    <Section id="contact" title="Get In Touch">
      <div
        className="max-w-3xl mx-auto glass-effect rounded-xl overflow-hidden shadow-lg border-l-4 border-[var(--accent-glow)]"
        style={{ cursor: "default" }} // 🔹 Disable custom cursor here
      >
        {/* IDE-style header */}
        <div className="bg-gray-800/50 p-3 flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-400 ml-auto">ContactMe.java</span>
        </div>

        {/* Code snippet + run button */}
        <div className="p-6 text-left font-mono text-sm whitespace-pre-wrap overflow-x-auto bg-[var(--mid-bg)]">
          <code>
            <CodeSyntax type="comment">package</CodeSyntax>{" "}
            <CodeSyntax type="class">portfolio.contact</CodeSyntax>;{"\n\n"}
            <CodeSyntax type="keyword">public class</CodeSyntax>{" "}
            <CodeSyntax type="class">ContactMe</CodeSyntax> {"{\n\n"}
            {"    "}
            <CodeSyntax type="keyword">public static void</CodeSyntax>{" "}
            <CodeSyntax type="method">main</CodeSyntax>
            (String[] args) {"{\n"}
            {"        "}
            <CodeSyntax type="comment">
              // Run this program to start a conversation
            </CodeSyntax>
            {"\n"}
            {"        "}System.out.println(
            <CodeSyntax type="string">"Starting Contact Program..."</CodeSyntax>
            );{"\n"}
            {"        "}Contact.run();{"\n"}
            {"    "}\n\n
            {"    "}
            <CodeSyntax type="keyword">static class</CodeSyntax>{" "}
            <CodeSyntax type="class">Contact</CodeSyntax> {"{\n"}
            {"        "}
            <CodeSyntax type="keyword">static void</CodeSyntax>{" "}
            <CodeSyntax type="method">run</CodeSyntax>() {"{\n"}
            {"            "}System.out.println(
            <CodeSyntax type="string">"Awaiting user input..."</CodeSyntax>);
            {"\n        "}
            {"}\n    "}
            {"}\n"}
            {"}"}
          </code>

          {/* Run button with label */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowTerminal(true)}
              className="flex items-center gap-2 bg-green-600 text-black px-4 py-2 rounded-lg shadow-md 
                         hover:bg-green-400 transition-colors duration-300"
              title="Run ContactMe.java"
            >
              <span className="w-6 h-6 flex items-center justify-center bg-black/20 rounded-full">
                ▶
              </span>
              <span className="font-semibold">Run Code</span>
            </button>
          </div>

          {/* Fake terminal */}
          {showTerminal && (
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Output:</p>
              <div className="bg-black text-green-400 font-mono p-4 rounded-lg overflow-hidden">
                {questions.slice(0, step + 1).map((q, idx) => (
                  <div key={idx} className="mb-3">
                    <p>{q.text}</p>
                    {step === idx && (
                      <input
                        type="text"
                        value={form[q.key]}
                        onChange={(e) =>
                          setForm({ ...form, [q.key]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && form[q.key].trim()) {
                            setStep(step + 1);
                          }
                        }}
                        className="bg-black border-b border-green-500 text-green-300 outline-none w-full"
                        autoFocus
                      />
                    )}
                    {form[q.key] && step > idx && (
                      <p className="text-green-300">{form[q.key]}</p>
                    )}
                  </div>
                ))}

                {/* Show Send button when done */}
                {step === questions.length && (
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${
                        portfolioData.email
                      }?subject=Portfolio Contact&body=Name: ${form.name}%0AEmail: ${
                        form.email
                      }%0AMessage: ${form.message}`)
                    }
                    className="mt-4 bg-green-600 px-4 py-2 rounded-lg text-black font-bold hover:bg-green-400 flex items-center gap-2"
                  >
                    Send Message <SendIcon />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};
