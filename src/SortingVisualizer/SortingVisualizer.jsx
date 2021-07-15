import React from 'react';
import './SortingVisualizer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MergeSort} from '../Algorithms/MergeSort';
import {QuickSort} from '../Algorithms/QuickSort';
import {BubbleSort} from '../Algorithms/BubbleSort';
import {HeapSort} from '../Algorithms/HeapSort';

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'black';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component 
    {
        constructor(props)
            {
                super(props);
                this.state = 
                    {
                        array: [],
                    };
            }
            componentDidMount(){
                this.resetArray()
            }        

    resetArray() 
    {
        const array = [];
        for (let i = 0; i < 179; i++) 
            {
                array.push(randomIntFromInterval(5, 617));
            }
        this.setState({array});
    }

    finalColor() {
        let bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < bars.length; i++) {
          bars[i].className = "array-bar bar-animation";
        }
      }

    MergeSort() {
        const animations = MergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
        this.finalColor();
      }, 3 * animations.length);

    }

    QuickSort() {
        const animations = QuickSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [state, pIndex, barTwoIndex, pivotIndex] = animations[i];
            const pIndexBar = arrayBars[pIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            const pivotBar = arrayBars[pivotIndex].style;
            //Changes bars colors accordingly
            if (state === "comparing") {
              setTimeout(() => {
                pIndexBar.backgroundColor = 'red';
                barTwoStyle.backgroundColor = 'yellow';
                pivotBar.backgroundColor = 'orange';
              }, i * 3);
      
              // Turns bars back to blue
              setTimeout(() => {
                pIndexBar.backgroundColor = PRIMARY_COLOR;
                barTwoStyle.backgroundColor = PRIMARY_COLOR;
                pivotBar.backgroundColor = PRIMARY_COLOR;
              }, (i + 1) * 3);
            } else {
              //Swaps bar's heights
              setTimeout(() => {
                let tmp = pIndexBar.height;
                pIndexBar.height = barTwoStyle.height;
                barTwoStyle.height = tmp;
              }, i * 3);
            }
          }
          setTimeout(() => {
            this.finalColor();
          }, 3 * animations.length);
    }

    BubbleSort() {
        const animations = BubbleSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [state, iOne, iTwo] = animations[i];
            let iOneBar = arrayBars[iOne].style;
            let iTwoBar = arrayBars[iTwo].style;
            if (state === "comparing") {
              //Colors and resotores bars being compared
              setTimeout(() => {
                iOneBar.backgroundColor = SECONDARY_COLOR;
              }, i * 0.5);
              setTimeout(() => {
                iOneBar.backgroundColor = PRIMARY_COLOR;
              }, (i + 1) * 0.5);
            } else {
              //Swaps bar's heights
              setTimeout(() => {
                let tmp = iOneBar.height;
                iOneBar.height = iTwoBar.height;
                iTwoBar.height = tmp;
              }, i * 0.5);
            }
          }
          setTimeout(() => {
            this.finalColor();
          }, 8000);
    }

    HeapSort() {
        const animations = HeapSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [state, largest, comparison] = animations[i];
            const largestBar = arrayBars[largest].style;
            const comparisonBar = arrayBars[comparison].style;
            if (state === "comparing") {
              //Colors and restores bars being compared
              setTimeout(() => {
                largestBar.backgroundColor = SECONDARY_COLOR;
                comparisonBar.backgroundColor = SECONDARY_COLOR;
              }, i * 5);
              setTimeout(() => {
                largestBar.backgroundColor = PRIMARY_COLOR;
                comparisonBar.backgroundColor = PRIMARY_COLOR;
              }, (i + 1) * 5);
            } else {
              //Swaps bar's heights
              setTimeout(() => {
                let tmp = largestBar.height;
                largestBar.height = comparisonBar.height;
                comparisonBar.height = tmp;
              }, i * 5);
            }
          }
    }

    render() 
        {
            const {array} = this.state;

            return (
                <div className="array-container">
                    <div className="body"><p><b><u>Sorting Visualizer</u></b></p></div>
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx}
                        style={{
                            height: `${value}px`           
                            }}>
                        </div>
                    ))}
                    
                    <button onClick={() => this.resetArray()}>New Array</button>
                    <button onClick={() => this.MergeSort()}>Merge Sort</button>
                    <button onClick={() => this.QuickSort()}>Quick Sort</button>
                    <button onClick={() => this.BubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.HeapSort()}>Heap Sort</button>
                    
                    </div>
                );
            }       
        }
    

    function randomIntFromInterval(min, max)
    {
        return Math.floor(Math.random()*(max - min + 1) + min);
    }
