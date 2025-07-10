
export default function useSlugify(){
    const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD") // remove acentos
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "") // remove pontuação
      .trim()
      .replace(/\s+/g, "-");

    return{ slugify }
}