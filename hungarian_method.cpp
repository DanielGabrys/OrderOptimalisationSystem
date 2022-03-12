// A C++ program for Dijkstra's single source shortest path algorithm.
// The program is for adjacency matrix representation of the graph
#include <iostream>
#include <limits.h>
#include <limits>
#include <bits/stdc++.h>


#define N 5
#define PER N*(N-3)/2+N

  int solution_arr[N+1];
  int min_col[N];
  int min_col_id[N];
  int min_row[N];
  int min_row_id[N];

  int W[N][N]={
        {INT_MAX,132,217,164,58},
        {132,INT_MAX,290,201,79},
        {217,290,INT_MAX,113,303},
        {164,201,113,INT_MAX,196},
        {58,79,303,196,INT_MAX}
         };

using namespace std;

  int min2(int i,int j)
    {
        int min_row=INT_MAX;
        int min_col=INT_MAX;
        for(int k=0;k<N;k++)
        {
            if(W[i][k]<=min_row && k!=j)
                    {
                        min_row=W[i][k];
                    } 
        }

        for(int k=0;k<N;k++)
        {
            if(W[k][j]<=min_col && k!=i)
                    {
                        min_col=W[k][j];
                    } 
        }
        return min_col+min_row;
    }



int main()
{


  // Odczytujemy dane wejściowe


 
  

  
    for(int k=0;k<1;k++) 
    {


        for(int i = 0; i < N; i++ )
        {
            min_row[i]=INT_MAX;
            min_row_id[i]=INT_MAX;
            

            for(int j = 0; j < N; j++ )
            {
                    if(W[i][j]<=min_row[i] )
                    {
                        min_row[i]=W[i][j];
                        min_row_id[i]=j;
                    }
            }

            //cout<<min_row[i]<<endl;
            for(int j=0;j<N;j++)
            {
                W[i][j]-=min_row[i];
            }
        }    

        for(int i=0;i<N;i++)
        {
            min_col[i]=INT_MAX;
            for(int j = 0; j < N; j++ )
            {
                if(W[j][i]<=min_col[i] )
                {
                        min_col[i]=W[j][i]; 
                        min_col_id[i]=j; 
                }  
            }

            // cout<<min_col[i]<<endl;
            for(int j=0;j<N;j++)
            {
               
                W[j][i]-=min_col[i];
            }

        }
    }

    // second niminum loop
        int join_max=-INT_MAX;
        for(int i = 0; i < N; i++)
        {
            for(int j = 0; j < N; j++ )
            {

                    if(W[i][j]==0)
                    {
                        min_row[i]=min2(i,j);    
                        //cout<<min_row[i]<<endl;
                        if(min_row[i]>join_max) 
                            join_max=min_row[i];
                    }
            }
            
        }
        cout<<join_max<<endl;
    
  
  /*
    for(int i=0;i<N;i++)
    {
        //cout<<min_row[i]<<" "<<endl;
    }
    cout<<endl;
    for(int i=0;i<N;i++)
    {
       // cout<<min_col[i]<<" "<<endl;
    }
    */
    for(int i=0;i<N;i++)
    {
        for(int j=0;j<N;j++)
        {
            cout<<W[i][j]<<" ";
        }
        cout<<endl;
    }

	return 0;
}

// This code is contributed by shivanisinghss2110
