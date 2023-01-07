import styles from "./styles.module.css"
import githubSvg from "../../assets/icons/github.svg"
import buildingSvg from "../../assets/icons/building.svg"
import usersSvg from "../../assets/icons/users.svg"
import shareSvg from "../../assets/icons/share.svg"
import { NavLink } from "react-router-dom"
import { FormEvent, useEffect, useState } from "react"
import { githubApi } from "../../lib/axios"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

type User = {
  name: string
  username: string
  bio: string
  company: string | null
  followersAmount: number
  avatarUrl: string
  githubUrl: string
}

type Post = {
  id: number
  title: string
  description: string
  createdAt: string
}

export function Home() {
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function getUser() {
      const userResponse = await githubApi.get('/users/lhmoreno')
      const followersResponse = await githubApi.get('/users/lhmoreno/followers')

      setUser({
        name: userResponse.data.name,
        username: userResponse.data.login,
        bio: userResponse.data.bio,
        company: userResponse.data.company,
        followersAmount: followersResponse.data.length,
        avatarUrl: userResponse.data.avatar_url,
        githubUrl: userResponse.data.html_url
      })
    }

    async function getPosts() {
      const issuesResponse = await githubApi.get('/repos/rocketseat-education/reactjs-github-blog-challenge/issues')
      const issues = issuesResponse.data as Array<any>

      const initialPosts: Post[] = issues.map((issue) => {
        return {
          id: issue.number,
          title: issue.title,
          description: issue.body,
          createdAt: issue.created_at
        }
      })

      setPosts(initialPosts)
    }

    getUser()
    getPosts()
  }, [])

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const search = formData.get('search')

    const { data } = await githubApi.get(`/search/issues?q=${search}repo:rocketseat-education/reactjs-github-blog-challenge`)
    const issues = data.items as Array<any>

      const searchPosts: Post[] = issues.map((issue) => {
        return {
          id: issue.number,
          title: issue.title,
          description: issue.body,
          createdAt: issue.created_at
        }
      })

      setPosts(searchPosts)
  }

  if (!user) {
    return <span>Carregando...</span>
  }

  return (
    <div>
      <div className={styles.profile}>
        <img src={user.avatarUrl} alt="" />
        <div>
          <h2>{user.name}</h2>
          <a 
            href={user.githubUrl}
            target="_blank" 
            rel="noopener noreferrer"
          >
            Github
            <img src={shareSvg} alt="" />
          </a>
          <p>{user.bio}</p>
          <footer>
            <span>
              <img src={githubSvg} alt="" />
              {user.username}
            </span>
            {user.company &&
              <span>
                <img src={buildingSvg} alt="" />
                {user.company}
              </span>
            }
            <span>
              <img src={usersSvg} alt="" />
              {user.followersAmount} seguidores
            </span>
          </footer>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <div>
          <h4>Publicações</h4>
          <span>{posts.length} publicações</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="search"
            placeholder="Buscar conteúdo"
          />
        </form>
      </div>

      <div className={styles.postsContainer}>
        {posts.map((post) => {
          const createAt = post.createdAt ?? new Date().toString()
          const publishedAt = formatDistanceToNow(new Date(createAt), {
            addSuffix: true,
            locale: ptBR
          })

          return (
            <NavLink to={`/posts/${post.id}`} key={post.id}>
              <header>
                <h3>{post.title}</h3>
                <span>{publishedAt}</span>
              </header>
              <main>
                <p>{post.description}</p>
              </main>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
