import './HideShowMenu.css';

function HideButton({ sideBarHideShowHandle }) {
  return (
    <button type="button" className="buttonRemove arrowhideShow right" onClick={sideBarHideShowHandle} />
  );
}

function ShowButton({ sideBarHideShowHandle }) {
  return (
    <button type="button" className="buttonRemove arrowhideShow left" onClick={sideBarHideShowHandle} />
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
