import Link from "next/link";
import styles from "@/styles/MarkDown.module.css";
import { useRouter } from "next/router";

const Breadcrumb = ({ items }) => {
  const router = useRouter()
  function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
  
  let itemsBreadCrumb = items.concat({
    label: router.query?.id?.split('-').slice(0, -1).join('-') || router.query.slug[0].split('-').slice(0, -1).join('-'),
    href: "/"
  });
  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      <ol className={styles.breadcrumbList}>
        {itemsBreadCrumb?.map((item, index) => (
          <li
            key={index}
            className={`${styles.breadcrumbItem} ${index === itemsBreadCrumb.length - 1 ? styles.activeBreadCumb : ""
              }`}
          >
            {index === itemsBreadCrumb.length - 1 ? (
              <span>{capitalizeFirstLetter(item.label?.replaceAll('-', ' '))}</span>
            ) : (
              <Link className={styles.linkBreadCumb} href={item.href}>
                {item.label}
              </Link>
            )}
            {index !== itemsBreadCrumb.length - 1 && (
              <span className={styles.separator}>›</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
