from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flaskext.mysql import MySQL
import sys

mysql = MySQL()
app = Flask(__name__)

port = 5000

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'bill'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)
api = Api(app)


class Amazon(Resource):

    def get(self, conf_id):
        conn = mysql.connect()
        cursor = conn.cursor()
        select_query = "SELECT name, prod, price from bill where bid = " + str(conf_id)
        cursor.execute(select_query)
        rows = cursor.fetchall()
        mydict = {}
        arr = []
        import json
        for row in rows:
        	arr.append({"name":row[0],"prod":row[1],"price":row[2]})
        	mydict["bill"] = arr
        	print(mydict)
        conn.commit()
        conn.close()
        if len(rows) > 0:
        	return mydict
        return {'bill': None}, 404

    def post(self, conf_id):
        data = request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        insert_query = "insert into bill (bid, name, prod, price) values ('" + str(conf_id) + "', '" + str(data['name']) +  "', '" + data['prod'] + "', '"+ data['price'] + "')"
        cursor.execute(insert_query)
        conn.commit()
        conn.close()
        response = {'insertion': 'success'}
        return response, 201

    def put(self, conf_id):
    	data = request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        update_query = "update bill set name = '" + data['name'] + "' where bid = " + str(conf_id)
        cursor.execute(update_query)
        conn.commit()
        conn.close()
        response = {'updation': 'success'}
        return response, 404

    def delete(self, conf_id):
        conn = mysql.connect()
        cursor = conn.cursor()
        delete_query = "delete from bill where bid = " + str(data['bid']
        cursor.execute(delete_query)
        conn.commit()
        conn.close()
        response = {'deletion': 'success'}
        return response, 404


api.add_resource(Amazon, '/userbill/<int:conf_id>')

app.run(port=port, debug=True)