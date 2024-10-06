/* eslint-disable max-len */
import './HomeContainer.scss';

export default function HomeContainer({ sideBarHideShowHandle }) {
  return (
    <div className="HomeContainer">
      <h1>Welcome, to Our Site!</h1>
      <button type="button" className="buttonRemove startButton" onClick={sideBarHideShowHandle}>Start</button>
      <br />
      <p className="title">DSA Explorer: A Teacher&apos;s Toolkit</p>
      <p className="coverText">Welcome to our educational platform designed to empower teachers in delivering an exceptional learning experience for data structures and algorithms. Our comprehensive resources offer a blend of interactive lessons, real-world applications, and collaborative tools, providing educators with the support they need. Whether you&apos;re guiding beginners or honing advanced skills, our platform caters to all levels.</p>
      <p className="coverText">Join us on a journey to foster algorithmic thinking, problem-solving prowess, and a deeper understanding of data structures. Elevate your teaching with our dynamic content and create a classroom where students thrive in the world of algorithms.</p>
    </div>
  );
}
