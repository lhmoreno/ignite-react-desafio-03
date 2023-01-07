import styles from "./styles.module.css"
import githubSvg from "../../assets/icons/github.svg"
import calendarSvg from "../../assets/icons/calendar.svg"
import chatSvg from "../../assets/icons/chat.svg"
import shareSvg from "../../assets/icons/share.svg"
import arrowLeftSvg from "../../assets/icons/arrow-left.svg"
import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { githubApi } from "../../lib/axios"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

type Post = {
  title: string
  description: string
  createdAt: string
  commentsAmount: number
  author: string
  githubUrl: string
}

export function Post() {
  const { id } = useParams()
  const [post, setPost] = useState<Post>()

  const createdAt = post?.createdAt ?? new Date().toString()
  const publishedAt = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ptBR
  })

  useEffect(() => {
    async function getPost() {
      const { data } = await githubApi.get(`/repos/rocketseat-education/reactjs-github-blog-challenge/issues/${id}`)

      setPost({
        title: data.title,
        description: data.body,
        createdAt: data.created_at,
        commentsAmount: data.comments,
        author: data.user.login,
        githubUrl: data.html_url
      })
    }

    getPost()
  }, [])

  if (!post) {
    return <span>Carregando...</span>
  }

  return (
    <div>
      <div className={styles.postInfo}>
        <div>
          <NavLink to="/">
            <img src={arrowLeftSvg} alt="" />
            Voltar
          </NavLink>
          <a 
            href={post.githubUrl}
            target="_blank" 
            rel="noopener noreferrer"
          >
            Ver no Github
            <img src={shareSvg} alt="" />
          </a>
        </div>
        <h1>{post.title}</h1>
        <footer>
          <span>
            <img src={githubSvg} alt="" />
            {post.author}
          </span>
          <span>
            <img src={calendarSvg} alt="" />
            {publishedAt}
          </span>
          <span>
            <img src={chatSvg} alt="" />
            {post.commentsAmount} comentários
          </span>
        </footer>
      </div>

      <div className={styles.description}>
        <ReactMarkdown>
          {post.description}
        </ReactMarkdown>
      </div>
    </div>
  )
}
