import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Start from "./pages/Start";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Concepts from "./pages/Concepts";
import ConceptDetail from "./pages/ConceptDetail";
import Math from "./pages/Math";
import MathDetail from "./pages/MathDetail";
import Interactive from "./pages/Interactive";
import News from "./pages/News";
import FAQ from "./pages/FAQ";
import Glossary from "./pages/Glossary";
import LearningPath from "./pages/LearningPath";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/empezar" element={<Start />} />
        <Route path="/clases" element={<Classes />} />
        <Route path="/clases/:id" element={<ClassDetail />} />
        <Route path="/conceptos" element={<Concepts />} />
        <Route path="/conceptos/:slug" element={<ConceptDetail />} />
        <Route path="/matematica" element={<Math />} />
        <Route path="/matematica/:slug" element={<MathDetail />} />
        <Route path="/interactivos" element={<Interactive />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/dudas" element={<FAQ />} />
        <Route path="/glosario" element={<Glossary />} />
        <Route path="/ruta" element={<LearningPath />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
