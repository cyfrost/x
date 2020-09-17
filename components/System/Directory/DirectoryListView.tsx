import styles from '@/styles/System/Directory/DirectoryList.module.scss';

import type { FC } from 'react';
import type { DirectoryView } from '@/components/System/Directory/Directory.d';

import { useState } from 'react';
import { ClickHandler } from '@/utils/events';

const homeDir = '/';

// TODO: Create DirectyListEntry
// TODO: Stop using custom click handler, replace single click with focusing
// TODO: style.emphasis is not needed

export const DirectoryList: FC<DirectoryView> = ({
  onDoubleClick,
  cwd,
  entries
}) => {
  const [selected, setSelected] = useState('');

  return (
    <table className={styles.directory}>
      <thead>
        <tr className={styles.emphasis}>
          <th>Name</th>
          <th>Size</th>
          <th>Kind</th>
        </tr>
      </thead>
      <tbody>
        {cwd !== homeDir && (
          <tr
            className={selected === '..' ? styles.selected : ''}
            onClick={
              new ClickHandler({
                singleClick: () => setSelected('..'),
                doubleClick: onDoubleClick('..')
              }).clickHandler
            }
          >
            <td>..</td>
            <td colSpan={3}></td>
          </tr>
        )}
        {entries.map(({ icon, kind, name, path, url, size, fullName }) => (
          <tr
            className={selected === path ? styles.selected : ''}
            key={path}
            onFocus={() => setSelected(path)}
            onClick={
              new ClickHandler({
                doubleClick: onDoubleClick(path, url, icon, name)
              }).clickHandler
            }
            tabIndex={0}
          >
            <td className={styles.emphasis} title={name}>
              <figure>
                <img alt={name} src={icon} draggable={false} />
                <figcaption title={name}>{fullName}</figcaption>
              </figure>
            </td>
            <td>{size}</td>
            <td>{kind}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DirectoryList;
