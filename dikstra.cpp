// A C++ program for Dijkstra's single source shortest path algorithm.
// The program is for adjacency matrix representation of the graph
#include <iostream>
#include <limits.h>
#include <limits>
#include <bits/stdc++.h>

int ver_arr[] ={17,41,53,101,31,47,73,15,50};
int size=sizeof(ver_arr)/sizeof(ver_arr[0]);
#define X 16
#define Y 8
#define N 9
#define PER N*(N-3)/2+N

#define V X*Y

const int MAXINT = 2147483647;
int n, m, v0, d, dh, sptr, shptr;
bool **A;                         // Macierz sąsiedztwa
int **W;                          // Macierz wag krawędzi
int *S, *Sh;                      // Stosy w tablicy
bool *visited;

int v[PER][N+1];

int previous=-1;

using namespace std;


// A utility function to find the vertex with minimum distance value, from
// the set of vertices not yet included in shortest path tree
int minDistance(int dist[], bool sptSet[])
{

	// Initialize min value
	int min = INT_MAX, min_index;

	for (int v = 0; v < V; v++)
		if (sptSet[v] == false && dist[v] <= min)
			min = dist[v], min_index = v;

	return min_index;
}

void printPath(int parent[], int j, int i)
{
       
    // Base Case : If j is source
    if (parent[j] == - 1)
        return;
    
    i++;
    if(i==2)
      previous=j+1;
    printPath(parent, parent[j],i);
    
    
  
    printf("%d ", j+1);
}

// A utility function to print the constructed distance array
void printSolution(int dist[],int n,int parent[],int end_point,int start_point)
{
	cout <<"ST_ID \tDist \tEND_ID \tPATH" << endl;

  cout <<start_point+1<<"\t"<< dist[end_point]<<" \t"<<end_point+1<<"\t"; 
  printPath(parent, end_point,0);
  cout<<endl;

/*
  cout <<"XY \tID \tDIS \tPATH" << endl;
  int counter=0;
	for (int i = 0; i < Y; i++)
  {
    for (int j = 0; j < X; j++)
    {

      
      if(dist[counter]==INT_MAX)
        dist[counter]=-1;
      
      cout <<"["<< i<<" "<<j<<"]" << " \t"<<counter+1<<"\t"<<dist[counter]<<"\t"; 
      if(dist[counter]!=-1)
         printPath(parent, counter);
      cout<<endl;
      
      
      
      counter++;
    }
  }
  */
}

// Function that implements Dijkstra's single source shortest path algorithm
// for a graph represented using adjacency matrix representation
int dijkstra(int **graph, int src,int end_point,bool flag)
{
	int dist[V]; // The output array. dist[i] will hold the shortest
	// distance from src to i

	bool sptSet[V]; // sptSet[i] will be true if vertex i is included in shortest
	// path tree or shortest distance from src to i is finalized


  int parent[V];


	// Initialize all distances as INFINITE and stpSet[] as false
	for (int i = 0; i < V; i++)
  {
    parent[src-1] = -1;
		dist[i] = INT_MAX, 
    sptSet[i] = false;
    
  }

	// Distance of source vertex from itself is always 0
	dist[src-1] = 0;

	// Find shortest path for all vertices
	for (int count = 0; count < V - 1; count++) {
		// Pick the minimum distance vertex from the set of vertices not
		// yet processed. u is always equal to src in the first iteration.
		int u = minDistance(dist, sptSet);
  
  
		// Mark the picked vertex as processed
		sptSet[u] = true;

		// Update dist value of the adjacent vertices of the picked vertex.
		for (int v = 0; v < V; v++)
    {

       
        // Update dist[v] only if is not in sptSet, there is an edge from
        // u to v, and total weight of path from src to v through u is
        // smaller than current value of dist[v]
        if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX	&& dist[u] + graph[u][v] < dist[v])
        {
            dist[v] = dist[u] + graph[u][v];
            parent[v] = u;
            
        }
    }

   // printSolution(dist,V,parent);
				
	}

	// print the constructed distance array
  if(flag==1)
	  printSolution(dist,V,parent,end_point-1,src-1);
  return dist[end_point-1];
}

void initialize_data(int **graph)
{
  /*
  room schema to load
  0  - free field (we can move there)
  -1 - scheel (cant move throught)
  1 - start point
  2 - end point
  */

 /*
  int load[Y][X] = {
            { 0,0,0,0,0,0,0,0,0 }, // 1 row
            { -1,0,-1,0,0,2,0,-1,0 },
            { -1,0,-1,0,0,-1,0,-1,0 },
            { -1,0,-1,0,0,-1,0,-1,0 },
            { -1,0,-1,0,0,-1,0,-1,0 },
            { 0,0,0,0,0,0,0,0,0 },
            { 1,0,0,0,0,0,0,0,0 },
            { 1,1,1,1,1,1,0,0,0 },
             };  */ 

 
  int load[Y][X] = {
            { -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 }, // 1 row
            { -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1 },
            { -1,  0, -1, -1,  0, -1, -1,  0,  0, -1,  -1,  0, -1, -1,  0, -1 },
            { -1,  0, -1, -1,  0, -1, -1,  0,  0, -1, -1,  0, -1, -1,  0, -1 },
            { -1,  0, -1, -1,  0, -1, -1,  0,  0, -1, -1,  0, -1, -1,  0, -1 },
            { -1,  0, -1, -1,  0, -1, -1,  0,  0, -1, -1,  0, -1, -1,  0, -1 },
            {  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1 },
            {  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1 },
             };   
    

   //entry_indexes(start_node,load[X][Y],"start")
   //entry_indexes(end_node,load[X][Y],"end")
  ///initialize graph with zero 


  for(int i=0;i<V;i++)
  {
      for(int j=0;j<V;j++)
      {
          graph[i][j]=0;
         // cout<<graph[i][j]<<endl;
      }
  }

  int counter2=0;
  for(int i=Y-1;i>=0;i--)
  {
    for(int j=0;j<X;j++)
    {
       // cout<<load[i][j]<<endl;
        if(load[i][j]!=-1)
        {
              if(i!=0 ) //up connected node
              {
                graph[counter2][counter2+X]=1;
              }

              if(i!=Y-1) //down connected node
              {
                graph[counter2][counter2-X]=1;
              }

              if(j!=0) //left connected node
              {
                graph[counter2][counter2-1]=1;
              }

              if(j!=X-1) //right connected node
              {
                graph[counter2][counter2+1]=1;
              }
              
            
        }
       
        counter2++;

    }
    
  }
 
}

void show_graph_mesh(int **graph)
{
  int counter3=1;
  for(int i=0;i<V;i++)
  {
     cout<<"ID: "<<counter3<<"\t";
    for(int j=0;j<V;j++)
    {
       cout<<graph[i][j]<<" ";
        
    }
    counter3++;
    cout<<endl;
  }
}

void TSP ( int v )
{
  int u;

  Sh [ shptr++ ] = v;              // zapamiętujemy na stosie bieżący wierzchołek

  if( shptr < N )                  // jeśli brak ścieżki Hamiltona, to jej szukamy
  {
    visited [ v ] = true;          // Oznaczamy bieżący wierzchołek jako odwiedzony
    for( u = 0; u < N; u++ )       // Przeglądamy sąsiadów wierzchołka v
      if( A [ v ][ u ] && !visited [ u ] ) // Szukamy nieodwiedzonego jeszcze sąsiada
      {
        dh += W [ v ][ u ];        // Dodajemy wagę krawędzi v-u do sumy
        TSP ( u );                 // Rekurencyjnie wywołujemy szukanie cyklu Hamiltona
        dh -= W [ v ][ u ];        // Usuwamy wagę krawędzi z sumy
      }
    visited [ v ] = false;         // Zwalniamy bieżący wierzchołek
  }
  else if( A [ v0 ][ v ] )         // Jeśli znaleziona ścieżka jest cyklem Hamiltona
  {
    dh += W [ v ][ v0 ];           // to sprawdzamy, czy ma najmniejszą sumę wag
    if( dh < d )                   // Jeśli tak, 
    {
      d = dh;                      // To zapamiętujemy tę sumę
      for( u = 0; u < shptr; u++ ) // oraz kopiujemy stos Sh do S
        S [ u ] = Sh [ u ];
      sptr = shptr;
    }
    dh -= W [ v ][ v0 ];           // Usuwamy wagę krawędzi v-v0 z sumy
  }
  shptr--;                         // Usuwamy bieżący wierzchołek ze ścieżki
}

int main()
{

  int **graf = new int *[V];
  for(int i = 0; i < V; ++i)
    graf[i] = new int[V];

  int start_node=17;
  int end_node=53;

  initialize_data(graf);
  //show_graph_mesh(graf);
  cout<<endl;


  int i, j, x, y, z;

  // Tworzymy struktury dynamiczne i inicjujemy je

  S       = new int [ N ];
  Sh      = new int [ N ];
  visited = new bool [ N ];
  A       = new bool * [ N ];
  W       = new int * [ N ];
  for( i = 0; i < N; i++ )
  {
    A [ i ] = new bool [ N ];
    W [ i ] = new int [ N ];
    for( j = 0; j < N; j++ )
    {
      A [ i ][ j ] = false;
      W [ i ][ j ] = 0;
    }
    visited [ i ] = false;
  }
  sptr = shptr = 0;

  // Odczytujemy dane wejściowe


  int solution_arr[N+1];

  for(int i = 0; i < N; i++ )
  {
    for(int k=i+1;k<N;k++)
    {
      A [ i ][ k ] = A [ k ][ i ] = true; // Krawędź x-y
      W [ i ][ k ] = W [ k ][ i ] = dijkstra(graf,ver_arr[i],ver_arr[k],0);    // Waga krawędzi x-y
      //cout<<i<<" "<<k<<" "<<ver_arr[i]<<" "<<ver_arr[k]<<" "<<dijkstra(graf,ver_arr[i],ver_arr[k])<<endl;
    }
   // cin >> x >> y >>z 
    //A [ x ][ y ] = A [ y ][ x ] = true; // Krawędź x-y
    //W [ x ][ y ] = W [ y ][ x ] = z;    // Waga krawędzi x-y
  }

  cout << endl;

  // Rozpoczynamy algorytm

  d  = MAXINT;
  dh = v0 = 0;
  TSP ( v0 );
  if( sptr )
  {
    for( i = 0; i < sptr; i++ )
    {
       cout << ver_arr[S[i]] << " ";
       solution_arr[i]=ver_arr[S[i]];
    }
    solution_arr[sptr]=ver_arr[v0];
    cout << ver_arr[v0] << endl;
    cout << "d = " << d << endl;
  }
  else cout << "NO HAMILTONIAN CYCLE" << endl;

  cout << endl;
  int result=0;
  for(int i=0;i<N;i++)
  {
  result += dijkstra(graf,solution_arr[i],solution_arr[i+1],1);
  }
  cout<<result<<endl;


  // Usuwamy tablice dynamiczne

  delete [ ] S;
  delete [ ] Sh;
  delete [ ] visited;

  for( i = 0; i < N; i++ )
  {
    delete [ ] A [ i ];
    delete [ ] W [ i ];
  }

  delete [ ] A;
  delete [ ] W;     

  for (int h = 0; h < V; h++) // loop variable wasn't declared
          {
            delete [] graf[h];
          }
       delete [] graf;



	return 0;
}

// This code is contributed by shivanisinghss2110
