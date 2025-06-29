interface FooterProps {
  darkMode: boolean;
}

const Footer = ({ darkMode }: FooterProps) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-8`}>
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © 2025 MotoHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
