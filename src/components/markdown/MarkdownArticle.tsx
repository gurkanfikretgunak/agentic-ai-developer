import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MermaidDiagram } from "@/components/markdown/MermaidDiagram";

/**
 * Renders curriculum markdown. Fenced ```mermaid blocks become live,
 * monochrome-themed diagrams; everything else is academic typography.
 */
export function MarkdownArticle({ body }: { body: string }) {
  return (
    <div className="md-article">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { className, children } = props;
            const match = /language-(\w+)/.exec(className ?? "");
            if (match?.[1] === "mermaid") {
              return <MermaidDiagram code={String(children).trim()} />;
            }
            // Inline `badge:LABEL` tokens render as monochrome status badges.
            const text = String(children);
            if (!match && text.startsWith("badge:")) {
              return <span className="md-badge">{text.slice(6).trim()}</span>;
            }
            return <code className={className}>{children}</code>;
          },
          pre(props) {
            // Mermaid blocks render their own frame; unwrap the <pre>.
            return <>{props.children}</>;
          },
        }}
      >
        {body}
      </Markdown>
    </div>
  );
}
