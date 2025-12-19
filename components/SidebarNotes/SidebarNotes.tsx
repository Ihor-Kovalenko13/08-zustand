// import css from './SidebarNotes.module.css';
// import Link from 'next/link';

// export default function SidebarNotes() {
//   const tags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
//   console.log('tags', tags);

//   return (
//     <ul className={css.menuList}>
//       <li className={css.menuItem}>
//         <Link href={`/notes`} className={css.menuLink}>
//           All notes
//         </Link>
//       </li>
//       {tags.map(tag => (
//         <li key={tag} className={css.menuItem}>
//           <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
//             {tag}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }