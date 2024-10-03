export default function LoadingScreen(props) {
  return (
    <div>
      {/* <head>
        <meta
          name="google-site-verification"
          content="kRbwjumXat52-e3mUB7tt-faI1jx9mY0x1EMOPC5egE"
        />
      </head> */}
      <div className="LoadingScreen pink-glow">{props.percentage}%</div>;
    </div>
  );
}
