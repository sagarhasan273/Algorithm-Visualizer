import './HideShowMenu.css';

function HideButton({ sideBarHideShowHandle }) {
  return (
    <button type="button" className="buttonRemove arrow right" onClick={sideBarHideShowHandle} />
  );
}

function ShowButton({ sideBarHideShowHandle }) {
  return (
    <button type="button" className="buttonRemove arrow left" onClick={sideBarHideShowHandle} />
  );
}

export default function HideShowMenu({ sideBarHideShow, sideBarHideShowHandle }) {
  return (
    <div className="menuToggle">
      {sideBarHideShow ? (
        <HideButton
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
      ) : (
        <ShowButton
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
      )}
    </div>
  );
}
