import { motion } from "framer-motion";
interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({message}: ErrorMessageProps) => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        {message}
    </motion.div>
  )
}

export default ErrorMessage;