import styles from "./styles.module.css"
import githubSvg from "../../assets/icons/github.svg"
import buildingSvg from "../../assets/icons/building.svg"
import usersSvg from "../../assets/icons/users.svg"
import shareSvg from "../../assets/icons/share.svg"

export function Home() {
  return (
    <div>
      <div className={styles.profile}>
        <img src="https://github.com/lhmoreno.png" alt="" />
        <div>
          <h2>Luiz Henrique</h2>
          <a href="#">
            Github
            <img src={shareSvg} alt="" />
          </a>
          <p>Tristique volutpat pulvinar vel massa, pellentesque egestas. Eu viverra massa quam dignissim aenean malesuada suscipit. Nunc, volutpat pulvinar vel mass.</p>
          <footer>
            <span>
              <img src={githubSvg} alt="" />
              lhmoreno
            </span>
            <span>
              <img src={buildingSvg} alt="" />
              Zione Tecnologia
            </span>
            <span>
              <img src={usersSvg} alt="" />
              23 seguidores
            </span>
          </footer>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <div>
          <h4>Publicações</h4>
          <span>4 publicações</span>
        </div>
        <input 
          type="text" 
          placeholder="Buscar conteúdo"
        />
      </div>

      <div className={styles.postsContainer}>
        <div>
          <header>
            <h3>JavaScript data types and data structures</h3>
            <span>Há 1 dia</span>
          </header>
          <main>
            <p>Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have.</p>
          </main>
        </div>
        <div>
          <header>
            <h3>JavaScript data types and data structures</h3>
            <span>Há 1 dia</span>
          </header>
          <main>
            <p>Programming languages all have built-in data structures.</p>
          </main>
        </div>
        <div>
          <header>
            <h3>JavaScript data types and data structures</h3>
            <span>Há 1 dia</span>
          </header>
          <main>
            <p>Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have.</p>
          </main>
        </div>
        <div>
          <header>
            <h3>JavaScript data types and data structures</h3>
            <span>Há 1 dia</span>
          </header>
          <main>
            <p>Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have.</p>
          </main>
        </div>
      </div>
    </div>
  )
}
