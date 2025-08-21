# routes/data_management_routes.py

from flask import Blueprint, request, jsonify
from utils.db import engine
from sqlalchemy import text
import traceback

data_management_bp = Blueprint('data_management', __name__)

@data_management_bp.route('/truncate_data', methods=['POST'])
def truncate_data():
    """
    Truncate specified tables or all tables
    """
    try:
        data = request.get_json()
        table_type = data.get('table_type')
        
        if not table_type:
            return jsonify({'success': False, 'message': 'Table type is required'})
        
        with engine.connect() as conn:
            if table_type == 'all':
                # Truncate all tables in the correct order (to respect foreign key constraints)
                tables_to_truncate = [
                    'bft_matched',
                    'bt_matched', 
                    'bf_matched',
                    'tally_data',
                    'fin_data',
                    'bank_data'
                ]
                
                # Disable foreign key checks temporarily
                conn.execute(text("SET FOREIGN_KEY_CHECKS = 0"))
                
                for table in tables_to_truncate:
                    conn.execute(text(f"TRUNCATE TABLE {table}"))
                
                # Re-enable foreign key checks
                conn.execute(text("SET FOREIGN_KEY_CHECKS = 1"))
                conn.commit()
                
                return jsonify({
                    'success': True, 
                    'message': 'All data tables have been truncated successfully'
                })
                
            elif table_type in ['bank_data', 'fin_data', 'tally_data']:
                # Truncate specific table
                conn.execute(text(f"TRUNCATE TABLE {table_type}"))
                conn.commit()
                
                table_names = {
                    'bank_data': 'Bank Data',
                    'fin_data': 'Finance Data', 
                    'tally_data': 'Tally Data'
                }
                
                return jsonify({
                    'success': True,
                    'message': f'{table_names[table_type]} table has been truncated successfully'
                })
            else:
                return jsonify({'success': False, 'message': 'Invalid table type'})
                
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error truncating data: {str(e)}'
        })

@data_management_bp.route('/reset_matches', methods=['POST'])
def reset_matches():
    """
    Reset match flags in specified tables
    """
    try:
        data = request.get_json()
        match_type = data.get('match_type')
        
        if not match_type:
            return jsonify({'success': False, 'message': 'Match type is required'})
        
        with engine.connect() as conn:
            if match_type == 'all':
                # Reset all match flags and clear match result tables
                reset_queries = [
                    # Reset flags in main tables
                    "UPDATE bank_data SET bf_is_matched = 0, bf_date_matched = NULL, bft_is_matched = 0, bft_date_matched = NULL, bt_is_matched = 0, bt_date_matched = NULL",
                    "UPDATE fin_data SET bf_is_matched = 0, bf_date_matched = NULL, bft_is_matched = 0, bft_date_matched = NULL",
                    "UPDATE tally_data SET bft_is_matched = 0, bft_date_matched = NULL, bt_is_matched = 0, bt_date_matched = NULL",
                    # Clear match result tables
                    "DELETE FROM bft_matched",
                    "DELETE FROM bt_matched",
                    "DELETE FROM bf_matched"
                ]
                
                for query in reset_queries:
                    conn.execute(text(query))
                conn.commit()
                
                return jsonify({
                    'success': True,
                    'message': 'All match flags have been reset and match result tables cleared'
                })
                
            elif match_type == 'bank_fin':
                # Reset Bank-Fin match flags
                reset_queries = [
                    "UPDATE bank_data SET bf_is_matched = 0, bf_date_matched = NULL",
                    "UPDATE fin_data SET bf_is_matched = 0, bf_date_matched = NULL",
                    "DELETE FROM bf_matched"
                ]
                
                for query in reset_queries:
                    conn.execute(text(query))
                conn.commit()
                
                return jsonify({
                    'success': True,
                    'message': 'Bank-Fin match flags have been reset'
                })
                
            elif match_type == 'bank_fin_tally':
                # Reset Bank-Fin-Tally match flags
                reset_queries = [
                    "UPDATE bank_data SET bft_is_matched = 0, bft_date_matched = NULL",
                    "UPDATE fin_data SET bft_is_matched = 0, bft_date_matched = NULL",
                    "UPDATE tally_data SET bft_is_matched = 0, bft_date_matched = NULL",
                    "DELETE FROM bft_matched"
                ]
                
                for query in reset_queries:
                    conn.execute(text(query))
                conn.commit()
                
                return jsonify({
                    'success': True,
                    'message': 'Bank-Fin-Tally match flags have been reset'
                })
                
            elif match_type == 'bank_tally':
                # Reset Bank-Tally match flags
                reset_queries = [
                    "UPDATE bank_data SET bt_is_matched = 0, bt_date_matched = NULL",
                    "UPDATE tally_data SET bt_is_matched = 0, bt_date_matched = NULL", 
                    "DELETE FROM bt_matched"
                ]
                
                for query in reset_queries:
                    conn.execute(text(query))
                conn.commit()
                
                return jsonify({
                    'success': True,
                    'message': 'Bank-Tally match flags have been reset'
                })
            else:
                return jsonify({'success': False, 'message': 'Invalid match type'})
                
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error resetting matches: {str(e)}'
        })
