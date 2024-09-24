// DEFINING A DOUBLY LINKED LIST
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }
}

//DEFINING SONG CLASS

class Song{
  constructor(audio, picture, name){
    this.audio = audio;
    this.picture = picture;
    this.name = name;
  }
}
const vacation = new Song('vacation.mp3', 'vacationPic.png', 'Vacation');
const summer = new Song('summer.mp3', 'summerPic.png', 'Summer');
const lazy = new Song('lazyDay.mp3', 'lazyPic.png', 'Lazy Day');
const soaring = new Song('soaring.mp3', 'soaringPic.png', 'Soaring');
const desert = new Song('desert.mp3', 'desertPic.png', 'Desert');

const dll = new DoublyLinkedList();
dll.append(vacation);
dll.append(summer);
dll.append(lazy);
dll.append(soaring);
dll.append(desert);
let currentNode = dll.head;