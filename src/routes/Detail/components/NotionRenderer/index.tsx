import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import {
  CodeBlock,
  CollectionViewBlock,
  CollectionViewPageBlock,
  ExtendedRecordMap,
  PageBlock,
  EquationBlock,
} from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"
import {
  MapImageUrlFn,
  MapPageUrlFn,
  NotionComponents,
  NotionContext,
  SearchNotionFn,
} from "react-notion-x"
type NotionRenderer = {
  recordMap: ExtendedRecordMap
  components?: Partial<NotionComponents>
  mapPageUrl?: MapPageUrlFn
  mapImageUrl?: MapImageUrlFn
  searchNotion?: SearchNotionFn
  isShowingSearch?: boolean
  onHideSearch?: () => void
  rootPageId?: string
  rootDomain?: string
  fullPage?: boolean
  darkMode?: boolean
  previewImages?: boolean
  forceCustomImages?: boolean
  showCollectionViewDropdown?: boolean
  linkTableTitleProperties?: boolean
  isLinkCollectionToUrlProperty?: boolean
  isImageZoomable?: boolean
  showTableOfContents?: boolean
  minTableOfContentsItems?: number
  defaultPageIcon?: string
  defaultPageCover?: string
  defaultPageCoverPosition?: number
  className?: string
  bodyClassName?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  pageHeader?: React.ReactNode
  pageFooter?: React.ReactNode
  pageTitle?: React.ReactNode
  pageAside?: React.ReactNode
  pageCover?: React.ReactNode
  blockId?: string
  hideBlockId?: boolean
  disableHeader?: boolean
}
const _NotionRenderer = dynamic<NotionRenderer>(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)
type Code = {
  block: CodeBlock
  defaultLanguage?: string
  className?: string
}
const Code = dynamic<Code>(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)
type Collection = {
  block: CollectionViewBlock | CollectionViewPageBlock | PageBlock
  className?: string
  ctx: NotionContext
}
const Collection = dynamic<Collection>(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
type Equation = {
  block: EquationBlock
  math?: string
  inline?: boolean
  className?: string
}
const Equation = dynamic<Equation>(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
type Pdf = {
  file: string
}
const Pdf = dynamic<Pdf>(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
  }
`
