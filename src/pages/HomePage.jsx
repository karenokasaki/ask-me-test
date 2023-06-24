import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
   ChartBarIcon,
   ChatBubbleLeftEllipsisIcon,
   ChatBubbleLeftRightIcon,
   FireIcon,
   MagnifyingGlassIcon,
   QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import dateFormater from "../utils/dataFormater";

export default function HomePage() {
   const [questions, setQuestions] = useState([]);
   const [form, setForm] = useState({
      question: "",
      answers: [],
      user: "",
   });
   const [reload, setReload] = useState(false);
   const [search, setSearch] = useState("");
   const [filterType, setFilterType] = useState("all");

   useEffect(() => {
      async function fetchQuestions() {
         const response = await axios.get(
            "https://webdev103.cyclic.app/questions"
         );
         setQuestions(response.data);
      }

      fetchQuestions();
   }, [reload]);

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         await axios.post("https://webdev103.cyclic.app/questions", form);

         setReload(!reload);
         setForm({
            question: "",
            asnswers: [],
            user: "",
         });
      } catch (error) {
         console.log(error);
      }
   }

   console.log(filterType);

   return (
      <div className="flex flex-col items-center justify-center">
         <form className="m-4 border border-slate-200 p-5 shadow-md rounded w-full">
            <textarea
               type="text"
               name="question"
               value={form.question}
               onChange={handleChange}
               className="border-none w-full h-24 resize-none p-2 shadow focus:outline-none  "
               placeholder="Faça sua pergunta aqui..."
               required
            />

            <div className="flex justify-center items-center mt-4">
               <input
                  type="text"
                  name="user"
                  value={form.user}
                  onChange={handleChange}
                  className="border-none w-full h-10 resize-none p-2 shadow focus:outline-none  "
                  placeholder="Seu nome..."
                  required
               />

               <button
                  onClick={handleSubmit}
                  className="
                     bg-primary-button
                     text-white
                     font-bold
                     py-2
                     px-6
                     tracking-wide
                     flex
                     gap-2
                  "
               >
                  <QuestionMarkCircleIcon className="h-6 w-6 text-black" />
               </button>
            </div>
         </form>

         {/* botões de filtro */}
         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <button
               className={`${
                  filterType === "all" ? "bg-slate-800 text-white" : ""
               } bg-primary-button font-bold py-2 px-4 rounded flex gap-2 hover:bg-slate-800 text-slate-800 hover:text-white`}
               onClick={() => setFilterType("all")}
            >
               <span>All</span>
               <ChatBubbleLeftRightIcon className="h-6 w-6  text-white" />{" "}
            </button>
            <button
               className={`${
                  filterType === "answered" ? "bg-slate-800 text-white" : ""
               } bg-primary-button font-bold py-2 px-4 rounded flex gap-2 hover:bg-slate-800 text-slate-800 hover:text-white`}
               onClick={() => setFilterType("answered")}
            >
               <span>Respondidas</span>
               <ChartBarIcon className="h-6 w-6 text-white" />
            </button>
            <button
               className={`${
                  filterType === "unanswered" ? "bg-slate-800 text-white" : ""
               } bg-primary-button font-bold py-2 px-4 rounded flex gap-2 hover:bg-slate-800 text-slate-800 hover:text-white`}
               onClick={() => setFilterType("unanswered")}
            >
               <span>Seja o primeiro</span>
               <ChartBarIcon className="h-6 w-6 text-white" />
            </button>
         </div>

         {/* search */}
         <div className=" w-2/3 flex items-center mt-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-accent absolute mx-2" />
            <input
               type="text"
               name="search"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="border-none w-full h-10 resize-none p-2 shadow focus:outline-none pl-10"
               placeholder="Pesquisar..."
               required
            />
         </div>

         <div className="flex flex-col gap-10 mt-7 sm:grid sm:grid-cols-2 ">
            {questions
               .filter((question) => {
                  if (filterType === "all") return true;
                  if (filterType === "answered")
                     return question.answers.length > 0;
                  if (filterType === "unanswered")
                     return question.answers.length === 0;
               })
               .filter(
                  (question) =>
                     question.question
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                     question.user.toLowerCase().includes(search.toLowerCase())
               )
               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
               .map((question) => {
                  return (
                     <div
                        key={question._id}
                        className="border p-4 flex flex-col gap-4 justify-between rounded bg-secondary-button shadow-sm border-none hover:bg-primary-button "
                     >
                        <Link to={`/questions/${question._id}`} className="p-2">
                           <p>{question.question}</p>
                        </Link>
                        <p className="text-xs text-gray-500 text-right mt-1">
                           {dateFormater(question.createdAt)}
                        </p>
                        <div className="flex justify-between bg-slate-100 pt-1 pr-2 pl-2">
                           <p className="text-sm">./{question.user}</p>
                           <p>
                              {question.answers.length > 0 ? (
                                 <span className="flex gap-2">
                                    {question.answers.length > 1 && (
                                       <FireIcon
                                          className="w-5 h-5 text-red-400"
                                          title="Essa publicação está em alta"
                                       />
                                    )}
                                    {question.answers.length}
                                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-purple-500 mt-0.5" />{" "}
                                 </span>
                              ) : (
                                 <span className="flex gap-2">
                                    -
                                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-purple-500 mt-0.5" />
                                 </span>
                              )}
                           </p>
                        </div>
                     </div>
                  );
               })}
         </div>
      </div>
   );
}
