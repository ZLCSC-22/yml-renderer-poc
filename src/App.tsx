import { useEffect, useState } from 'react'
import './App.css'
import * as yaml from 'js-yaml';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { getComponent } from './ComponentManager';
import { registerComponents } from './CustomComponents/init';

function App() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:5500/yaml-src/pages.yml", {headers: {"Content-Type": "application/x-yaml", Accept: "application/x-yaml", charset: "utf-8"}})
      const text = await response.text();
      return yaml.load(text);
    })().then(d => setData(d))
  }, [])

  console.log(data)
  if (data == undefined) return;
  const pages: any[] = data.pages

  return (
    <HashRouter>
      <Routes>
        {pages.map((p, i) => <Route key={i} path={p.route} element={<Page id={p.id}/>}/>)}
      </Routes>
    </HashRouter>
  )
}

function Page({id}: {id: string}) {
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => yaml.load(await (await fetch(`http://127.0.0.1:5500/yaml-src/${id}.yml`)).text()))().then(d => setData(d))
    registerComponents()
  }, [])

  if (data == undefined) return;
  const components: {id: string, data: any}[] = data.components

  return (
    <div className="page">
      {components.map((c, i) => getComponent(c, i))}
    </div>
  )
}

export default App
