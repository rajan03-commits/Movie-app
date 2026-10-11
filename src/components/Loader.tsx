import { motion } from "framer-motion"
const Loader = () => {
  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
        Loading...
    </motion.div >
  )
}

export default Loader