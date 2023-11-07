using System;
using System.Data;
using System.Data.SqlClient;
using Dapper;

public class DatabaseConnector
{

    private readonly string _connectionString;

    private readonly IDbConnection _dbConnection;
    public DatabaseConnector(string valor)
    {
        _connectionString = valor;
        // _dbConnection = new SqlConnection(_connectionString);
    }


    public  SqlConnection OpenConnection()
    {
        var conexion = new SqlConnection(_connectionString);
        if (conexion.State == ConnectionState.Closed)
        {
        conexion.Open();
            // _dbConnection.Open();
        }
        return conexion;
    }

    public void CloseConnection(SqlConnection Connection)
    {
        if (Connection.State == ConnectionState.Open)
        {
            Connection.Close();
        }
    }

    public IEnumerable<T> ExecuteQuery<T>(string sql, object parameters = null)
    {
        OpenConnection();
        var result = _dbConnection.Query<T>(sql, parameters);
        // CloseConnection();
        return result;
    }

    public int ExecuteNonQuery(string sql, object parameters = null)
    {
        OpenConnection();
        var result = _dbConnection.Execute(sql, parameters);
        // CloseConnection();
        return result;
    }
    public IEnumerable<T> ExecuteStoredProcedure<T>(string storedProcedureName, object parameters = null)
    {
        var conecction = OpenConnection();
        var result = conecction.Query<T>(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
        CloseConnection(conecction);
        return result;
    }

    public void ExecuteStoredProcedureN(string storedProcedureName, object parameters = null)
    {
        var conecction = OpenConnection();
        // OpenConnection();
        conecction.Execute(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
        // CloseConnection(conecction);
    }

}
