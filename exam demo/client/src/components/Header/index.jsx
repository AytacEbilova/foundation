import React, { useContext } from 'react'
import styles from '../Header/header.module.scss'
import { Link, useParams } from 'react-router-dom'
import { BasketContext } from '../../context/basketContext'
import { FavContext } from '../../context/wishlistContext'
import { useGetOneProductQuery } from '../../service/productApi'
const Header = () => {
   
    const {basket}=useContext(BasketContext);
    const{fav}=useContext(FavContext);
 
  return (
        <header>
            <div className="container">
                <div className={styles.all}>
                <div className={styles.logo}>
                    <h2>FOUNDATION</h2>
                </div>
                <div className={styles.right}>
                    <ul>
                        <li>
                            <Link to={'/'} className={styles.link}>Home</Link>
                        </li>
                        <li>
                            <Link to={'add'} className={styles.link}>Add</Link>
                        </li>
                        <li>
                            <Link to={'basket'} className={styles.link} >Basket <sub>{basket.length}</sub></Link>
                        </li>
                        <li>
                            <Link className={styles.link} >Wishlist <sub>{fav.length}</sub></Link>
                        </li>
                       
                    </ul>
                </div>
                </div>
              
            </div>
        </header>
 
  )
}

export default Header