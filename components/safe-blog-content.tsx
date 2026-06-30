function stripDangerousBlocks(content: string) {
  return content
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>[\s\S]*?<\/embed>/gi, "");
}

function stripTags(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export function SafeBlogContent({ content }: { content: string }) {
  const sanitized = stripDangerousBlocks(content);
  const blocks = Array.from(sanitized.matchAll(/<(h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi));

  if (!blocks.length) {
    return (
      <div className="prose-moneyfest mt-10">
        <p>{stripTags(sanitized)}</p>
      </div>
    );
  }

  return (
    <div className="prose-moneyfest mt-10">
      {blocks.map((match, index) => {
        const tagName = match[1].toLowerCase();
        const text = stripTags(match[2]);
        if (!text) return null;

        if (tagName === "h2") {
          return <h2 key={index}>{text}</h2>;
        }

        if (tagName === "h3") {
          return <h3 key={index}>{text}</h3>;
        }

        if (tagName === "li") {
          return <p key={index}>- {text}</p>;
        }

        return <p key={index}>{text}</p>;
      })}
    </div>
  );
}
