type Props = {
  missing: string[]
}

export function ConfigMissing({ missing }: Props) {
  return (
    <main className="config-missing">
      <section className="config-missing__card">
        <p className="tag">Configuração pendente</p>
        <h1>Faltam informações para exibir esta landing page</h1>
        <p>
          Crie o arquivo <code>src/siteConfig.ts</code> a partir de <code>src/siteConfig.example.ts</code> e preencha
          os campos abaixo.
        </p>
        <div className="config-missing__steps">
          <code>cp src/siteConfig.example.ts src/siteConfig.ts</code>
        </div>
        <ul>
          {missing.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
