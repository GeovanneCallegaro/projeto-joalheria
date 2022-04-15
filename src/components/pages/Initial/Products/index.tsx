import { useDispatch, useSelector } from 'react-redux'
import { toogleProduct } from '../../../../store/Products/Products.actions'
import { selectFourProducts } from '../../../../store/Products/Products.selectors'
import './styles.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const Products = (props: any) => {
    const {handleCart} = props

    const dispatch = useDispatch()
    const products = useSelector(selectFourProducts)

    const handleToggle = (id: number) => {
        handleCart()
        dispatch(toogleProduct(id))
    }

    const showVisualization = (event: any) => {
        const images = document.querySelectorAll('.imagemInitial') as unknown as Array<HTMLElement>
        const visualization = document.querySelectorAll('.visualization') as unknown as Array<HTMLElement>
        const visualizationElements = [...visualization]
        const elementsImages = [...images]

        elementsImages.map((el, index) => {
            if(event.getAttribute('data-initial') === visualizationElements[index].getAttribute('data-initial')) {
                visualizationElements[index].classList.add('show') 
            }
            return el
        })
    }
    
    const removeVisualization = () => {
        const visualization = document.querySelectorAll('.visualization') as unknown as Array<HTMLElement>
        const elements = [...visualization]

        elements.map((el) => {
            if(el.classList.contains('show')) {
                el.classList.remove('show')
            }
            return el
        })
    }

    return (
        <div className='containerProducts'>
            <div className='sliderContainerProducts'>
                {products.map((product: any) => (
                    <div className='imageContainer'>
                        <div className='visualization' data-initial={product.id}>
                            <p>Visualização rápida</p>
                        </div>
                        <Link to={`/product/${product.id}`}>
                            <img 
                                src={product.src[0]}
                                alt={product.id}
                                onMouseEnter={(event) => showVisualization(event.target)} 
                                onMouseLeave={removeVisualization}
                                className='imagemInitial'
                                data-initial={product.id}
                            />
                        </Link>
                        <div className='textImageContainer'>
                            <div>
                                <h3>{product.name}</h3>
                                <p>R$ {product.price}</p>
                            </div>
                            <div className='plusDiv'>
                                <AiOutlineShoppingCart className='iconPlus' onClick={() => handleToggle(product.id)}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}